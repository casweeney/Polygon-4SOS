// require("@nomiclabs/hardhat-waffle");
import "@nomiclabs/hardhat-ethers";
require("dotenv").config({ path: ".env" });

const ALCHEMY_GOERLI_API_KEY_URL = process.env.ALCHEMY_GOERLI_API_KEY_URL;

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    }
  },
  lockGasLimit: 200000000000,
  gasPrice: 10000000000,
};