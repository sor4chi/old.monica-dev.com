import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import * as styles from './detail.css';

import { serverEnv } from '@/env/server';
import { client, gql } from '@/lib/graphql';
import { parseMarkdownToHTML } from '@/lib/markdown';
import type { BlogHeroFragmentResponse } from '@/ui/feature/blog/hero';
import { BlogHero, BlogHeroFragment } from '@/ui/feature/blog/hero';
import type { BlogsRecommendQueryResponse, BlogsRecommendQueryVariables } from '@/ui/feature/blog/recommend/recommend';
import { BlogsRecommend, BlogsRecommendQuery } from '@/ui/feature/blog/recommend/recommend';
import { BlogShare } from '@/ui/feature/blog/share';
import type { BlogShareFragmentResponse } from '@/ui/feature/blog/share/query';
import { BlogShareFragment } from '@/ui/feature/blog/share/query';
import { Toc } from '@/ui/feature/blog/toc';
import { Article } from '@/ui/foundation/article';
import { Breadcrumb } from '@/ui/foundation/breadcrumb';
import { Divider } from '@/ui/foundation/divider';
import { getOgUrl } from '@/util/og';

interface Props {
  params: {
    slug: string;
  };
}

// force-static for ISR, because static page for SEO
export const dynamic = 'force-static',
  dynamicParams = true;

const BlogDetailPageQuery = gql`
  ${BlogHeroFragment}
  ${BlogShareFragment}

  query BlogDetailQuery($slug: String!) {
    blog(slug: $slug) {
      ...BlogHeroFragment
      ...BlogShareFragment
      title
      content
      description
      publishedAt
    }
  }
`;

type BlogDetailPageQueryResponse = {
  blog: BlogHeroFragmentResponse &
    BlogShareFragmentResponse & {
      title: string;
      content: string;
      description: string;
      publishedAt: string;
    };
};

type BlogDetailPageQueryVariables = {
  slug: string;
};

const BlogSlugsQuery = gql`
  query BlogSlugsQuery {
    blogs(input: { limit: 1000, offset: 0 }) {
      data {
        slug
      }
    }
  }
`;

type BlogSlugsQueryResponse = {
  blogs: {
    data: {
      slug: string;
    }[];
  };
};

export async function generateStaticParams() {
  try {
    const res = await client.request<BlogSlugsQueryResponse>(BlogSlugsQuery);
    return res.blogs.data;
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blog } = await client.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(
    BlogDetailPageQuery,
    {
      slug: params.slug,
    },
  );

  return {
    description: blog.description,
    openGraph: {
      description: blog.description,
      images: [
        {
          alt: blog.title,
          height: 630,
          url: getOgUrl(blog.title),
          width: 1200,
        },
      ],
      publishedTime: blog.publishedAt,
      title: blog.title,
      type: 'article',
      url: `${serverEnv.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
    },
    title: blog.title,
    twitter: {
      card: 'summary_large_image',
      description: blog.description,
      images: [getOgUrl(blog.title)],
      title: blog.title,
    },
  };
}

async function getBlog(slug: string) {
  try {
    const { blog } = await client.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(
      BlogDetailPageQuery,
      {
        slug,
      },
    );
    const { blogs } = await client.request<BlogsRecommendQueryResponse, BlogsRecommendQueryVariables>(
      BlogsRecommendQuery,
      {
        tags: blog.tags.map((tag) => tag.slug),
      },
    );

    return {
      body: {
        ...parseMarkdownToHTML(blog?.content || ''),
      },
      meta: {
        createdAt: blog.createdAt,
        description: blog.description,
        id: blog.id,
        publishedAt: blog.publishedAt,
        tags: blog.tags,
        title: blog.title,
        updatedAt: blog.updatedAt,
      },
      recommends: blogs.data,
    };
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.slug);

  return (
    <>
      <BlogHero blog={blog.meta} />
      {/* <BlogArticle id={blog.meta.id} title={blog.meta.title} content={blog.body.content} toc={blog.body.toc} /> */}
      <section className={styles.detail}>
        <Article content={blog.body.content} />
        <aside className={styles.sidebar}>
          <div className={styles.dividerContainer}>
            <Divider direction="vertical" />
          </div>
          <div className={styles.itemContainer}>
            <Toc toc={blog.body.toc} />
            <BlogShare id={blog.meta.id} title={blog.meta.title} />
          </div>
        </aside>
      </section>
      <Divider margin=".5rem 0" />
      <h2>Related Blogs</h2>
      <BlogsRecommend id={blog.meta.id} recommends={blog.recommends} />
      <Breadcrumb />
    </>
  );
}
