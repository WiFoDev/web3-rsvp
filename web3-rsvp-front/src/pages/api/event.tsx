import {resolve} from "path";

import {Web3Storage, File, getFilesFromPath} from "web3.storage";
import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import nextConnect from "next-connect";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something wrong happened! ${error.message}`,
    });
  },
  onNoMatch(req, res) {
    res.status(405).json({
      error: "Method not allowed",
      success: false,
    });
  },
});

apiRoute.use(upload.single("image"));

type ExtendedReq = {
  file: Express.Multer.File;
};

apiRoute.post<ExtendedReq>(async (req, res) => {
  const {body, file} = req;

  try {
    const files = await makeFileObjects(body, file);
    const cid = await storeFiles(files);

    return res.status(200).json({success: true, cid});
  } catch (e) {
    return res.status(500).json({
      error: `Error creating event! ${e}`,
      success: false,
    });
  }
});

async function makeFileObjects(
  body: any,
  imageFile: Express.Multer.File,
) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(), `${imageFile.path}`);

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

export default apiRoute;
