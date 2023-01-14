// require("@nomiclabs/hardhat-waffle");
import "@nomiclabs/hardhat-ethers";
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config({ path: ".env" });


const ALCHEMY_MUMBAI_API_KEY_URL = process.env.ALCHEMY_MUMBAI_API_KEY_URL;
const ALCHEMY_GOERLI_API_KEY_URL = process.env.ALCHEMY_GOERLI_API_KEY_URL;

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

const ETHERSCAN_API_TOKEN = process.env.ETHERSCAN_API_TOKEN;
const POLYGONSCAN_API_TOKEN = process.env.POLYGONSCAN_API_TOKEN;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    mumbai: {
      url: ALCHEMY_MUMBAI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_TOKEN
  },
  lockGasLimit: 200000000000,
  gasPrice: 10000000000,
};