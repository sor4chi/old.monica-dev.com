import { readdir, readFileSync } from "fs";
import { join } from "path";

import { Timeline } from "#/types/timeline";

const TIMELINE_DIR = join(process.cwd(), "docs/timelines");

export const getTimelines = async (): Promise<Timeline[]> => {
  const files = await new Promise<string[]>((resolve) => {
    readdir(TIMELINE_DIR, (err, files) => {
      if (err) throw err;
      resolve(files);
    });
  });
  return files.map((file) => {
    const content = readFileSync(join(TIMELINE_DIR, file), 'utf-8');
    const filename = file.replace(/\.md$/, '');
    const date = new Date(filename);
    if (isNaN(date.getTime())) throw new Error('timeline date is invalid');
    const dateISOstr = date.toISOString();
    return {
      date: dateISOstr,
      content,
    };
  });
}