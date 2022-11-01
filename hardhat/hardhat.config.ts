import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {config as envConfig} from 'dotenv'
envConfig()

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY as string

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
