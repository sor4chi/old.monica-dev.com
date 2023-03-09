import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import 'katex/dist/katex.min.css';

import * as styles from './detail.css';

import { fetchGetBlogBySlug } from '@/app/api/blog/[slug]/route';
import { fetchGetBlogSlugs } from '@/app/api/blog/slugs/route';
import { Article } from '@/ui/foundation/article';
import { Toc } from '@/ui/foundation/blog/toc';

interface Props {
  params: {
    slug: string;
  };
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetchGetBlogBySlug(params.slug);
  const ogImageUrl = `${process.env.BASE_URL}/api/og?title=${res.title}`;

  return {
    description: res.description,
    openGraph: {
      description: res.description,
      images: [
        {
          alt: res.title,
          height: 630,
          url: ogImageUrl,
          width: 1200,
        },
      ],
      publishedTime: res.createdAt,
      title: res.title,
      type: 'article',
      url: `${process.env.BASE_URL}/blog/${params.slug}`,
    },
    title: res.title,
    twitter: {
      card: 'summary_large_image',
      description: res.description,
      images: [ogImageUrl],
      title: res.title,
    },
  };
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
