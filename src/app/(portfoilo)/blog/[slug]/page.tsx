import { clsx } from 'clsx';
import mikan from 'mikanjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import * as styles from './detail.css';

import { fetchGetBlogBySlug } from '@/app/api/blog/[slug]/route';
import { fetchGetBlogSlugs } from '@/app/api/blog/slugs/route';
import { Article } from '@/ui/foundation/article';
import { TagList } from '@/ui/foundation/blog/tagList';
import { Toc } from '@/ui/foundation/blog/toc';
import { formatYYYYMMDD } from '@/util/date';

import 'katex/dist/katex.min.css';

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
      <section className={styles.hero}>
        <h1 className={styles.title}>
          {mikan.split(blog.title).map((item, i) => (
            <span key={i} className={styles.titleWord}>
              {item}
            </span>
          ))}
        </h1>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Created at</span>
            <span>{formatYYYYMMDD(blog.createdAt)}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Updated at</span>
            <span>{formatYYYYMMDD(blog.updatedAt)}</span>
          </div>
          <div className={clsx(styles.metaItem, styles.tagList)}>
            <span className={styles.metaLabel}>Tags</span>
            <TagList tags={blog.tags.map((tag) => ({ name: tag, slug: tag }))} />
          </div>
        </div>
      </section>
      <section className={styles.detail}>
        <Article content={blog.content} />
        <aside className={styles.sidebar}>
          <Toc toc={blog.toc} />
        </aside>
      </section>
    </>
  );
}
