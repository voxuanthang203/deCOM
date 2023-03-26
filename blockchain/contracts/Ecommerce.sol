// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./NFT.sol";

error Ecommerce__UserNotExisted();
error Ecommerce__ItemNotExisted();
error Ecommerce__IncorrectAmountSent();
error Ecommerce__UnsuccessfulEthTransfer();
error Ecommerce__NotAnOwner();
error Ecommerce__NotAnOwnerOfContract();
error Ecommerce__UserOrManufacturerAlreadyExists();
error Ecommerce__ManufacturerNotExisted();

contract Ecommerce is ReentrancyGuard {
    using Counters for Counters.Counter;

    /**
     * @dev ====Define all structs====
     */
    struct User {
        mapping(uint256 => MarketItem) unconfirmedNfts;
        mapping(uint256 => MarketItem) boughtNfts;
        uint256 purchasedNftNum;
        bool flag;
    }

    struct MarketItem {
        uint256 tokenId;
        address nftContract;
        uint256 price;
        address payable owner;
        bool flag;
    }

    /**
     * @dev ====Define all events====
     */
    event MarketItemMoveToPending(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed owner,
        uint256 price
    );

    event ItemHasArrivedToUser(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed owner,
        uint256 price
    );

    event ItemDidNotArriveToCustomer(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed owner,
        uint256 price
    );

    event NewMarketItemListed(
        uint256 indexed tokenId,
        address indexed nftContract,
        address indexed owner,
        uint256 price
    );

    event MarketItemRemoved(uint256 indexed tokenId);

    event NewUserCreated(address indexed userAddress);

    event NewManufacturerCreated(address indexed manufacturerAddress);

    event NewNftMinted(
        address indexed nftContract,
        address indexed manufacturer,
        uint256 indexed tokenId
    );

    /**
     * @dev All modifiers
     */
    modifier _onlyOwner() {
        if (msg.sender != i_owner) {
            revert Ecommerce__NotAnOwnerOfContract();
        }
        _;
    }

    /**
     * @dev ====Define the neccesarry variables====
     */
    address payable private immutable i_owner;
    Counters.Counter private s_itemIds;
    uint256 private immutable i_listingFee;
    uint256 private immutable i_mintFee;
    uint256 private s_itemNum;
    mapping(uint256 => MarketItem) private s_itemIdToMarketItem;
    mapping(address => User) private s_userAddressToUser;
    mapping(address => bool) private s_manufacturerDoesExist;

    constructor() {
        i_owner = payable(msg.sender);
        i_listingFee = 0.003 ether;
        i_mintFee = 0.006 ether;
        s_itemNum = 0;
    }

    /**
     * @notice ====Below are functions to change the state of the ecommerce====
     */

    // Function to buy a market item
    function confirmBuyMarketItem(
        uint256 itemId
    ) public payable nonReentrant {
        User storage user = s_userAddressToUser[msg.sender];
        MarketItem memory marketItem = s_itemIdToMarketItem[itemId];

        if (!user.flag) {
            revert Ecommerce__UserNotExisted();
        }
        if (!marketItem.flag) {
            revert Ecommerce__ItemNotExisted();
        }

        uint256 price = marketItem.price;
        if (msg.value != price) {
            revert Ecommerce__IncorrectAmountSent();
        }

        user.unconfirmedNfts[itemId] = marketItem;
        delete s_itemIdToMarketItem[itemId];
        --s_itemNum;

        emit MarketItemMoveToPending(
            marketItem.tokenId,
            msg.sender,
            marketItem.owner,
            price
        ); // Emit an event to notify that the transaction is successful
    }

    // Function to confirm that the item has arrived to the user
    function confirmReceiveMarketItem(uint256 itemId) public nonReentrant {
        if (!s_userAddressToUser[msg.sender].flag) {
            revert Ecommerce__UserNotExisted();
        }

        MarketItem memory marketItem = s_userAddressToUser[msg.sender]
            .unconfirmedNfts[itemId];
        if (!marketItem.flag) {
            revert Ecommerce__ItemNotExisted();
        }

        address nftContractAddress = marketItem.nftContract;
        address payable nftOwner = marketItem.owner;
        (bool success, ) = nftOwner.call{value: marketItem.price}(""); // Send Eth to the owner of the NFT
        if (!success) {
            revert Ecommerce__UnsuccessfulEthTransfer();
        }
        IERC721(nftContractAddress).transferFrom(
            nftOwner,
            msg.sender,
            marketItem.tokenId
        ); // Transfer NFT from the current owner to the user
        delete s_userAddressToUser[msg.sender].unconfirmedNfts[itemId];
        s_userAddressToUser[msg.sender].boughtNfts[itemId] = marketItem;
        ++s_userAddressToUser[msg.sender].purchasedNftNum;

        emit ItemHasArrivedToUser(
            marketItem.tokenId,
            msg.sender,
            nftOwner,
            marketItem.price
        ); // Emit an event to notify that the transaction is successful
    }

    // Function to report that no item is received
    function reportNotReceiveMarketItem(
        uint256 itemId
    ) public nonReentrant {
        User storage user = s_userAddressToUser[msg.sender];
        if (!user.flag) {
            revert Ecommerce__UserNotExisted();
        }

        MarketItem memory marketItem = user.unconfirmedNfts[itemId];
        if (!marketItem.flag) {
            revert Ecommerce__ItemNotExisted();
        }

        uint256 price = marketItem.price;
        (bool success, ) = payable(msg.sender).call{value: price}(""); // Refund eth back to the user
        if (!success) {
            revert Ecommerce__UnsuccessfulEthTransfer();
        }
        s_itemIdToMarketItem[itemId] = marketItem;
        delete s_userAddressToUser[msg.sender].unconfirmedNfts[itemId];
        ++s_itemNum;

        emit ItemDidNotArriveToCustomer(
            marketItem.tokenId,
            msg.sender,
            marketItem.owner,
            price
        ); // Emit an event to notify that the transaction is successful
    }

    // Add a new nft to the sale list
    function listMarketItem(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant returns (uint256) {
        if (
            !s_manufacturerDoesExist[msg.sender] &&
            !s_userAddressToUser[msg.sender].flag
        ) {
            revert Ecommerce__UserNotExisted();
        }
        if (msg.value != i_listingFee) {
            revert Ecommerce__IncorrectAmountSent();
        }
        if (IERC721(nftContractAddress).ownerOf(tokenId) != msg.sender) {
            revert Ecommerce__NotAnOwner();
        }

        uint256 itemId = s_itemIds.current();
        (bool success, ) = i_owner.call{value: i_listingFee}(""); // Send Eth to the contract owner
        if (!success) {
            revert Ecommerce__UnsuccessfulEthTransfer();
        }
        s_itemIdToMarketItem[itemId] = MarketItem(
            tokenId,
            nftContractAddress,
            price,
            payable(msg.sender),
            true
        );
        s_itemIds.increment();
        ++s_itemNum;

        emit NewMarketItemListed(
            tokenId,
            nftContractAddress,
            payable(msg.sender),
            price
        ); // Emit an event to notify that the transaction is successful

        return itemId;
    }

    // Remove a nft from the sale list
    function unlistMarketItem(uint256 itemId) public {
        MarketItem memory marketItem = s_itemIdToMarketItem[itemId];

        if (
            !s_manufacturerDoesExist[msg.sender] &&
            !s_userAddressToUser[msg.sender].flag
        ) {
            revert Ecommerce__UserNotExisted();
        }
        if (!marketItem.flag) {
            revert Ecommerce__ItemNotExisted();
        }
        if (msg.sender != marketItem.owner) {
            revert Ecommerce__NotAnOwner();
        }

        delete s_itemIdToMarketItem[itemId];
        --s_itemNum;

        emit MarketItemRemoved(marketItem.tokenId); // Emit an event to notify that the transaction is successful
    }

    // Sign up a new user
    function signUpNewUser() public {
        if (
            s_userAddressToUser[msg.sender].flag ||
            s_manufacturerDoesExist[msg.sender]
        ) {
            revert Ecommerce__UserOrManufacturerAlreadyExists();
        }

        s_userAddressToUser[msg.sender].flag = true;
        s_userAddressToUser[msg.sender].purchasedNftNum = 0;

        emit NewUserCreated(msg.sender);
    }

    // Sign up a new manufacturer
    function signUpNewManufacturer(address userAddress) public _onlyOwner {
        if (
            s_userAddressToUser[userAddress].flag ||
            s_manufacturerDoesExist[userAddress]
        ) {
            revert Ecommerce__UserOrManufacturerAlreadyExists();
        }

        s_manufacturerDoesExist[userAddress] = true;

        emit NewManufacturerCreated(userAddress);
    }

    // // Mint a new NFT (As a manufacturer)
    // function mintNewNft(
    //     address nftContractAddress,
    //     string memory tokenURI
    // ) public payable nonReentrant returns (uint256) {
    //     if (!s_manufacturerDoesExist[msg.sender]) {
    //         revert Ecommerce__ManufacturerNotExisted();
    //     }
    //     if (msg.value != i_mintFee) {
    //         revert Ecommerce__IncorrectAmountSent();
    //     }

    //     NFT nftContract = NFT(nftContractAddress);
    //     uint256 tokenId = nftContract.mintDEET(tokenURI);

    //     emit NewNftMinted(nftContractAddress, msg.sender, tokenId);

    //     return tokenId;
    // }

    /**
     * @notice ====Below are view and pure functions====
     */

    // Fetch all items that are on sale
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 marketItemNum = s_itemIds.current();
        uint256 index = 0;
        MarketItem[] memory marketItems = new MarketItem[](s_itemNum);
        for (uint256 i = 0; i < marketItemNum; ++i) {
            if (s_itemIdToMarketItem[i].flag) {
                marketItems[index++] = s_itemIdToMarketItem[i];
            }
        }
        return marketItems;
    }

    // Fetch all items listed by the current user (or manufacturer)
    function fetchListedItems() public view returns (MarketItem[] memory) {
        if (
            !s_userAddressToUser[msg.sender].flag &&
            !s_manufacturerDoesExist[msg.sender]
        ) {
            revert Ecommerce__UserNotExisted();
        }
        uint256 listedItemNum = 0;
        uint256 marketItemNum = s_itemIds.current();
        for (uint256 i = 0; i < marketItemNum; ++i) {
            if (
                s_itemIdToMarketItem[i].flag &&
                s_itemIdToMarketItem[i].owner == msg.sender
            ) {
                ++listedItemNum;
            }
        }
        MarketItem[] memory marketItems = new MarketItem[](listedItemNum);
        uint256 index = 0;
        for (uint256 i = 0; i < marketItemNum; ++i) {
            if (
                s_itemIdToMarketItem[i].flag &&
                s_itemIdToMarketItem[i].owner == msg.sender
            ) {
                marketItems[index++] = s_itemIdToMarketItem[i];
            }
        }
        return marketItems;
    }

    // Fetch all items purchased by the current user
    function fetchPurchasedItems()
        public
        view
        returns (MarketItem[] memory)
    {
        if (!s_userAddressToUser[msg.sender].flag) {
            revert Ecommerce__UserNotExisted();
        }
        uint256 purchasedNum = s_userAddressToUser[msg.sender]
            .purchasedNftNum;
        MarketItem[] memory marketItems = new MarketItem[](purchasedNum);
        uint256 marketItemNum = s_itemIds.current();
        uint256 index = 0;
        for (uint256 i = 0; i < marketItemNum; ++i) {
            if (s_userAddressToUser[msg.sender].boughtNfts[i].flag) {
                marketItems[index++] = s_userAddressToUser[msg.sender]
                    .boughtNfts[i];
            }
        }
        return marketItems;
    }

    // Get the price one have to pay to list an item on the market
    function fetchListingPrice() public view returns (uint256) {
        return i_listingFee;
    }

    // Get the mint fee
    function fetchMintFee() public view returns (uint256) {
        return i_mintFee;
    }

    // Check if an address is a manufacturer or not
    function isManufacturer(
        address userAddress
    ) public view returns (bool) {
        return s_manufacturerDoesExist[userAddress];
    }
}
