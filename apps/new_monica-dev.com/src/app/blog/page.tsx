/* eslint-disable redos/no-vulnerable */
import fs from 'node:fs';
import path from 'node:path';

import { BlogList } from './_components/BlogList';
import externalBlogs from './_externalBlogs.json';

async function getInternalBlogs() {
  const THIS_DIR = path.join(process.cwd(), 'src', 'app', 'blog');
  // find all path in this directory
  const dirOrFiles = await fs.promises.readdir(THIS_DIR);
  // filter out _* dirs and files
  const blogDirs = dirOrFiles
    .filter((dirOrFile) => !dirOrFile.startsWith('_'))
    .filter((dirOrFile) => path.extname(dirOrFile) === '');
  // dynamic import TITLE, DESCRIPTION, DATE, THUMBNAIL
  const blogs = await Promise.all(
    blogDirs.map(async (dir) => {
      const text = fs.readFileSync(path.join(THIS_DIR, dir, 'layout.tsx'), 'utf-8');
      const TITLE = text.match(/const TITLE = '(.*)';/)?.[1];
      const DESCRIPTION = text.match(/const DESCRIPTION = '(.*)';/)?.[1];
      const PUBLISHED_AT = text.match(/const PUBLISHED_AT = '(.*)';/)?.[1];
      const THUMBNAIL = text.match(/const THUMBNAIL = '(.*)';/)?.[1];
      return {
        description: DESCRIPTION,
        publishedAt: PUBLISHED_AT,
        slug: dir,
        thumbnail: THUMBNAIL,
        title: TITLE,
      };
    }),
  );

  return blogs;
}

export default async function BlogListPage() {
  const blogs = await getInternalBlogs();

  return <BlogList internalBlogs={blogs} externalBlogs={externalBlogs} />;
}
