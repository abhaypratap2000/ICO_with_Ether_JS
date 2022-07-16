require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths:{
    artifacts:'./src/artifacts',
  },
  networks:{
    hardhat:{
      chainId:1337
    },
    ropsten:{
        url:"https://ropsten.infura.io/v3/d5484f4921b74bc283dd7d4f29e9c242",
        accounts:["fe4da7b4db1cfc5d0020e42cefeadac489269a2b16c3734b6301e9f13104dd1a"]
    }
  }
};
