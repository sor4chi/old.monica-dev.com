import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { serverEnv } from '@/env/server';
import { client, gql } from '@/lib/graphql';
import { parseMarkdownToHTML } from '@/lib/markdown';
import { getPublishedBlogSlugs } from '@/repository/blog';
import type { BlogArticleFragmentResponse } from '@/ui/feature/blog/atricle';
import { BlogArticle, BlogArticleFragment } from '@/ui/feature/blog/atricle';
import type { BlogHeroFragmentResponse } from '@/ui/feature/blog/hero';
import { BlogHero, BlogHeroFragment } from '@/ui/feature/blog/hero';
import { getOgUrl } from '@/util/og';

interface Props {
  params: {
    slug: string;
  };
}

// force-static for ISR, because static page for SEO
export const dynamic = 'force-static';
export const dynamicParams = true;

const BlogDetailPageQuery = gql`
  ${BlogHeroFragment}
  ${BlogArticleFragment}

  mutation BlogDetailPageQuery($slug: String!) {
    showBlog(slug: $slug) {
      ...BlogHeroFragment
      ...BlogArticleFragment
      description
      publishedAt
    }
  }
`;

type BlogDetailPageQueryResponse = {
  showBlog: BlogHeroFragmentResponse &
    BlogArticleFragmentResponse & {
      description: string;
      publishedAt: string;
    };
};

type BlogDetailPageQueryVariables = {
  slug: string;
};

export async function generateStaticParams() {
  try {
    const blogSlugs = await getPublishedBlogSlugs();
    return blogSlugs.map((slug) => slug);
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await client.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(BlogDetailPageQuery, {
    slug: params.slug,
  });

  const blog = data.showBlog;

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
    const data = await client.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(BlogDetailPageQuery, {
      slug,
    });

    const blog = data.showBlog;

    return {
      body: {
        ...parseMarkdownToHTML(blog?.content || ''),
      },
      meta: {
        createdAt: blog.createdAt,
        description: blog.description,
        publishedAt: blog.publishedAt,
        tags: blog.tags,
        title: blog.title,
        updatedAt: blog.updatedAt,
      },
    };
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogHero blog={blog.meta} />
      <BlogArticle content={blog.body.content} toc={blog.body.toc} />
    </>
  );
}
