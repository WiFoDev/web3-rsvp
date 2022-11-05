import { getStorageClient } from "./getStorageClient";

export async function storeFiles(files: any) {
  const client = getStorageClient();
  const cid = await client.put(files);

  return cid;
}