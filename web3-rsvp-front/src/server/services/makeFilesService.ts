import {resolve} from "path";

import {File, getFilesFromPath} from "web3.storage";

export async function makeFileObjects(
  body: any,
  imagePath: string,
) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(), `${imagePath}`);

  const files = await getFilesFromPath(imageDirectory);
  files.push(new File([buffer], "data.json"));
  return files;
}
