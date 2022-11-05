import {resolve} from "path";

import {File, getFilesFromPath} from "web3.storage";

export async function makeFileObjects(
  body: any,
  imageFile: Express.Multer.File,
) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(), `${imageFile.path}`);

  const files = await getFilesFromPath(imageDirectory);
  files.push(new File([buffer], "data.json"));
  return files;
}
