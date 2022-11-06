import multer from "multer";
import {NextApiRequest, NextApiResponse} from "next";
import nextConnect from "next-connect";

import {
  deleteImageFile,
  makeFileObjects,
  storeFiles,
} from "../services";
import {ExtendedReq} from "../types";

export const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
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

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

apiRoute.use(upload.single("image"));

apiRoute.post<ExtendedReq>(async (req, res) => {
  const {body, file} = req;
  const imagePath = file.path;

  try {
    const files = await makeFileObjects(body, file);
    const cid = await storeFiles(files);

    deleteImageFile(imagePath);

    return res.status(200).json({success: true, cid});
  } catch (e) {
    return res.status(500).json({
      error: `Error creating event! ${e}`,
      success: false,
    });
  }
});
