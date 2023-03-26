require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("@nomicfoundation/hardhat-toolbox");

const ETH_RPC_URL =
    `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` ||
    "https://url.com";
const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY || "0x1234";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "12345";
const COINMARKETCAP_API_KEY =
    process.env.COINMARKETCAP_API_KEY || "abcdxyz";

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
            gasPrice: 35000000000,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: false,
        noColors: true,
        outputFile: "gas-report.txt",
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
        },
    },
};
