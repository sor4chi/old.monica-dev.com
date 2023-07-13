import fs from 'fs';

export const getDirFiles = async (dir: string, ext: string) => {
  const files = await fs.promises.readdir(dir);
  return files.filter((file) => file.endsWith(ext));
};
