const { Alchemy, Network } = require("alchemy-sdk");
require("dotenv").config();

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const getNonce = async (userAddress) => {
  const nonce = await alchemy.core.getTransactionCount(userAddress, "latest");
  return nonce;
};

module.exports = { getNonce };
