import {Web3Storage} from "web3.storage";

export function getStorageClient() {
  return new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN as string,
  });
}
