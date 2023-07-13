import fs from 'fs';
import path from 'path';

import { BlogDetailWrapper } from '../_components/BlogDetailWrapper';

import { mdxCompiler } from '@/lib/mdx';

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-static';

const BLOG_DIR = path.join(process.cwd(), 'blogs');
const THUMBNAIL_DIR = path.join(process.cwd(), 'public/images/blog-thumbnails');

async function getBlog(slug: string) {
  const fullPath = path.join(BLOG_DIR, `original/${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Compile mdx
  const { content, frontmatter } = await mdxCompiler(fileContents);

  // Check is there a thumbnail for this blog
  const thumbnails = fs.readdirSync(THUMBNAIL_DIR);
  const thumbnail = thumbnails.find((thumbnail) => thumbnail.startsWith(slug));

  return {
    content,
    slug,
    thumbnail: thumbnail ? `/images/blog-thumbnails/${thumbnail}` : undefined,
    ...frontmatter,
  };
}

export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.slug);

  return (
    <BlogDetailWrapper
      title={blog.title}
      description={blog.description}
      date={blog.publishedAt}
      thumbnail={blog.thumbnail}
    >
      {blog.content}
    </BlogDetailWrapper>
  );
}
