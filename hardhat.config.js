require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bsctestnet: {
      url: process.env.RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
