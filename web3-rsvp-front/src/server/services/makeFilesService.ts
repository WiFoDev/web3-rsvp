import {resolve} from "path";

import {File, getFilesFromPath} from "web3.storage";

export async function makeFileObjects(
  body: any,
  file: Express.Multer.File,
) {
  const buffer = Buffer.from(
    JSON.stringify({...body, image: file.filename}),
  );

  const imageDirectory = resolve(process.cwd(), `${file.path}`);

  const files = await getFilesFromPath(imageDirectory);

  files.push(new File([buffer], "data.json"));

  return files;
}
