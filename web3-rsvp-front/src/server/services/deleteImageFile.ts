import { resolve } from "path"
import fs from 'fs'

export const deleteImageFile = (path: string) => {
  const imageDir = resolve(process.cwd(),path);
  fs.unlinkSync(imageDir)
}