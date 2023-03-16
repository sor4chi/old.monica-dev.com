import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import * as styles from './detail.css';

import { getOgUrl } from '@/app/api/og/route';
import { serverEnv } from '@/env/server';
import { parseMarkdownToHTML } from '@/lib/markdown';
import { getPublishedBlogBySlug, getPublishedBlogSlugs } from '@/repository/blog';
import { TagList } from '@/ui/feature/blog/tagList';
import { Toc } from '@/ui/feature/blog/toc';
import { Article } from '@/ui/foundation/article';
import { Text } from '@/ui/foundation/text';
import { formatYYYYMMDD } from '@/util/date';

interface Props {
  params: {
    slug: string;
  };
}

// force-static for ISR, because static page for SEO
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogSlugs = await getPublishedBlogSlugs();
    return blogSlugs.map((slug) => slug);
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getPublishedBlogBySlug(params.slug);

  if (!res) {
    return {
      robots: 'noindex',
    };
  }

  return {
    description: res.description,
    openGraph: {
      description: res.description,
      images: [
        {
          alt: res.title,
          height: 630,
          url: getOgUrl(res.title),
          width: 1200,
        },
      ],
      publishedTime: res.publishedAt.toISOString(),
      title: res.title,
      type: 'article',
      url: `${serverEnv.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
    },
    title: res.title,
    twitter: {
      card: 'summary_large_image',
      description: res.description,
      images: [getOgUrl(res.title)],
      title: res.title,
    },
  };
}

async function getBlog(slug: string) {
  try {
    const res = await getPublishedBlogBySlug(slug);
    if (!res) {
      return null;
    }

    return {
      ...res,
      ...parseMarkdownToHTML(res?.content || ''),
    };
  } catch (e) {
    if (serverEnv.NODE_ENV === 'development') {
      console.log(e);
    }
    return null;
  }
}

export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          <Text value={blog.title} />
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
            <TagList tags={blog.tags} hrefGenerator={(tag) => `/blog?tags=${tag}`} />
          </div>
        </div>
      </section>
      <section className={styles.detail}>
        <Article content={blog.content} />
        <aside className={styles.sidebar}>
          <hr className={styles.sidebarDivider} />
          <Toc toc={blog.toc} />
        </aside>
      </section>
    </>
  );
}
