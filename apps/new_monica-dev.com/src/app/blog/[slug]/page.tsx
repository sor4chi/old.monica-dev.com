import fs from 'fs';
import path from 'path';

import { BlogDetailWrapper } from '../_components/BlogDetailWrapper';

import { mdxCompiler } from '@/lib/mdx';
import { getDirFiles } from '@/utils/file';

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
  const { content, frontmatter, toc } = await mdxCompiler(fileContents);

  // Check is there a thumbnail for this blog
  const thumbnails = fs.readdirSync(THUMBNAIL_DIR);
  const thumbnail = thumbnails.find((thumbnail) => thumbnail.startsWith(slug));

  return {
    content,
    slug,
    toc,
    thumbnail: thumbnail ? `/images/blog-thumbnails/${thumbnail}` : undefined,
    ...frontmatter,
  };
}

export async function generateStaticParams() {
  const fullPath = path.join(BLOG_DIR, 'original');

  const files = await getDirFiles(fullPath, '.mdx');

  const slugs = files.map((file) => path.basename(file, '.mdx'));

  return slugs.map((slug) => ({ slug }));
}

export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.slug);

  return (
    <div className="forward">
      <BlogDetailWrapper
        title={blog.title}
        description={blog.description}
        date={blog.publishedAt}
        thumbnail={blog.thumbnail}
        toc={blog.toc}
      >
        {blog.content}
      </BlogDetailWrapper>
    </div>
  );
}
