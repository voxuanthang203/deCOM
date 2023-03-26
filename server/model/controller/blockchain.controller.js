require("dotenv").config();
const { getNonce } = require("../../utils/getNonce.js");
const { ecommerceAddress } = require("../../contracts/Ecommerce/address");
const Ecommerce = require("../../contracts/Ecommerce/Ecommerce.json");
const Web3 = require("web3");
const ethers = require("ethers");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const wallet = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, provider);
const ecommerce = new ethers.Contract(ecommerceAddress, Ecommerce.abi, wallet);

const mintNft = async (req, res) => {
  const { userAddress } = req.body;
  const nonce = await getNonce(userAddress);
};

const buyNft = async (req, res) => {
  const { userAddress, itemId, ethAmount } = req.body;
  const nonce = await getNonce(userAddress);

  const data = web3.eth.abi.encodeFunctionCall(
    {
      name: "confirmBuyMarketItem",
      type: "function",
      inputs: [
        {
          type: "uint256",
          name: "itemId",
        },
      ],
      payable: true,
      value: web3.utils.toWei(ethAmount, "ether"),
    },
    [itemId]
  );

  const tx = {
    to: ecommerceAddress,
    value: web3.utils.toWei(ethAmount, "ether"),
    gasLimit: "600000",
    maxPriorityFeePerGas: "5000000000",
    maxFeePerGas: "20000000000",
    nonce: nonce,
    data: data,
    chainId: 5,
  };
};

const confirmReceiveItem = async (req, res) => {
  const { userAddress, itemId } = req.body;
  const nonce = await getNonce(userAddress);

  const data = web3.eth.abi.encodeFunctionCall(
    {
      name: "confirmBuyMarketItem",
      type: "function",
      inputs: [
        {
          type: "uint256",
          name: "itemId",
        },
      ],
      payable: true,
      value: web3.utils.toWei(ethAmount, "ether"),
    },
    [itemId]
  );

  const tx = {
    to: ecommerceAddress,
    value: web3.utils.toWei(ethAmount, "ether"),
    gasLimit: "600000",
    maxPriorityFeePerGas: "5000000000",
    maxFeePerGas: "20000000000",
    nonce: nonce,
    data: data,
    chainId: 5,
  };
};

const reportNotReceiveItem = async (req, res) => {
  const { userAddress } = req.body;
  const nonce = await getNonce(userAddress);
};

const listItem = async (req, res) => {
  const { userAddress } = req.body;
  const nonce = await getNonce(userAddress);
};

const unlistItem = async (req, res) => {
  const { userAddress } = req.body;
  const nonce = await getNonce(userAddress);
};

const signupNewUser = async (req, res) => {
  const { userAddress } = req.body;
  const nonce = await getNonce(userAddress);
};

const signupNewManufacturer = async (req, res) => {
  try {
    const { userAddress } = req.body;
    const tx = await ecommerce.signUpNewManufacturer(userAddress, {
      gasLimit: 50000,
    });
    await tx.wait(1);
    res.status(200).json({
      message: `User ${userAddress} has been approved as a manufacturer`,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  mintNft,
  buyNft,
  confirmReceiveItem,
  reportNotReceiveItem,
  listItem,
  unlistItem,
  signupNewUser,
  signupNewManufacturer,
};
