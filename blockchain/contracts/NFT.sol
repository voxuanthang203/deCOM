// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Ecommerce.sol";

error NFT__NotAManufacturer();

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    /**
     * @dev Define the counter variable to store the latest tokenID and
     *      define a storage variable to store the address of the ecommerce smart contract
     */
    Counters.Counter private s_tokenIds;
    address private immutable i_ecommerceAddress;

    constructor(
        address ecommerceAddress
    ) ERC721("Decentralized Ecommerce Non-Fungible Token", "DEET") {
        i_ecommerceAddress = ecommerceAddress;
    }

    // Function to mint a new NFT
    function mintDEET(string memory tokenURI) public returns (uint256) {
        if (!Ecommerce(i_ecommerceAddress).isManufacturer(msg.sender)) {
            revert NFT__NotAManufacturer();
        }
        setApprovalForAll(i_ecommerceAddress, true);
        uint256 tokenId = s_tokenIds.current();
        s_tokenIds.increment();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}
