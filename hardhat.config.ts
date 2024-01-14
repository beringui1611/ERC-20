import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "local",
  networks:{
    local:{
      url: process.env.INFURA_URL,
      chainId: 31337,
      accounts:{
        mnemonic: process.env.SECRET
      }
    },
    sepolia:{
      url: process.env.INFURA_URL,
      chainId:11155111,
      accounts:{
        mnemonic:process.env.SECRET
      }
    }
  },
  etherscan:{
    apiKey: process.env.API_URL,

  }
};



export default config;
