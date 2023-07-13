/* eslint-disable redos/no-vulnerable */
import fs from 'node:fs';
import path from 'node:path';

import { BlogList } from './_components/BlogList';

import { mdxCompiler } from '@/lib/mdx';
import { ymlCompiler } from '@/lib/yml';
import { getDirFiles } from '@/utils/file';

const BLOG_DIR = path.join(process.cwd(), 'blogs');

async function getBlogs() {
  const dirs = fs.readdirSync(BLOG_DIR);

  const blogs = await Promise.all(
    dirs.map(async (dir) => {
      const fullPath = path.join(BLOG_DIR, dir);

      const [mdxFiles, ymlFiles] = await Promise.all([getDirFiles(fullPath, '.mdx'), getDirFiles(fullPath, '.yml')]);

      const mdxBlogs = await Promise.all(
        mdxFiles.map(async (file) => {
          const fileContents = fs.readFileSync(path.join(fullPath, file), 'utf8');

          // Compile mdx
          const { content, frontmatter } = await mdxCompiler(fileContents);

          // Check is there a thumbnail for this blog
          const thumbnails = fs.readdirSync(path.join(process.cwd(), 'public/images/blog-thumbnails'));
          const thumbnail = thumbnails.find((thumbnail) => thumbnail.startsWith(dir));

          return {
            content,
            slug: path.basename(file, '.mdx'),
            thumbnail: thumbnail ? `/images/blog-thumbnails/${thumbnail}` : undefined,
            type: 'internal' as const,
            ...frontmatter,
          };
        }),
      );

      const ymlBlogs = await Promise.all(
        ymlFiles.map(async (file) => {
          const fileContents = fs.readFileSync(path.join(fullPath, file), 'utf8');

          // Compile mdx
          const { meta } = await ymlCompiler(fileContents);

          return {
            provider: dir,
            type: 'external' as const,
            ...meta,
          };
        }),
      );

      return [...mdxBlogs, ...ymlBlogs];
    }),
  );

  return blogs.flat();
}

export default async function BlogListPage() {
  const blogs = await getBlogs();

  return <BlogList blogs={blogs} />;
}
