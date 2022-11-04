import {resolve} from "path";

import {Web3Storage, File, getFilesFromPath} from "web3.storage";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({
      message: "Method not allowed",
      success: false,
    });
  const {body} = req;

  try {
    const files = await makeFileObjects(body);
    const cid = await storeFiles(files);

    return res.status(200).json({success: true, cid});
  } catch (error) {
    return res
      .status(500)
      .json({error: "Error creating event", success: false});
  }
}

async function makeFileObjects(body: any) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(
    process.cwd(),
    `public/images/${body.image}`,
  );

  const files = await getFilesFromPath(imageDirectory);

  files.push(new File([buffer], "data.json"));

  return files;
}

function makeStorageClient() {
  return new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN as string,
  });
}

async function storeFiles(files: any) {
  const client = makeStorageClient();
  const cid = await client.put(files);

  return cid;
}
