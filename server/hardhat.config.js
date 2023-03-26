require("dotenv").config();

const ETH_RPC_URL = `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`;
const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY || "0x1234";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: ETH_RPC_URL,
      chainId: 5,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
      gas: 2100000,
      gasPrice: 35000000000,
    },
  },
};
