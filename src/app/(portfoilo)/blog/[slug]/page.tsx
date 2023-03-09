import { notFound } from 'next/navigation';
import 'highlight.js/styles/nord.css';
import 'katex/dist/katex.min.css';

import * as styles from './detail.css';

import { fetchGetBlogBySlug } from '@/app/api/blog/[slug]/route';
import { fetchGetBlogSlugs } from '@/app/api/blog/slugs/route';
import { Article } from '@/ui/foundation/article';
import { Toc } from '@/ui/foundation/blog/toc';

export async function generateStaticParams() {
  let blogSlugs: string[] = [];
  try {
    blogSlugs = await fetchGetBlogSlugs();
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
    blogSlugs = [];
  }

  return blogSlugs.map((slug) => ({
    slug,
  }));
}

async function getBlog(slug: string) {
  try {
    const res = await fetchGetBlogBySlug(slug);
    return res;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
    notFound();
  }
}

interface Props {
  params: {
    slug: string;
  };
}
export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.slug);

  return (
    <>
      <h1 className={styles.title}>{blog.title}</h1>
      <div className={styles.detail}>
        <Article content={blog.content} />
        <aside className={styles.sidebar}>
          <Toc toc={blog.toc} />
        </aside>
      </div>
    </>
  );
}
