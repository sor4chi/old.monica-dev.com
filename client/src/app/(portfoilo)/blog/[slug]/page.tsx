import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { serverEnv } from '@/env/server';
import { client, gql } from '@/lib/graphql';
import { parseMarkdownToHTML } from '@/lib/markdown';
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
export const dynamic = 'force-static',
  dynamicParams = true;

const BlogDetailPageQuery = gql`
  ${BlogHeroFragment}
  ${BlogArticleFragment}

  query BlogDetailQuery($slug: String!) {
    blog(slug: $slug) {
      ...BlogHeroFragment
      ...BlogArticleFragment
      description
      publishedAt
    }
  }
`;

type BlogDetailPageQueryResponse = {
  blog: BlogHeroFragmentResponse &
    BlogArticleFragmentResponse & {
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
      <BlogArticle id={blog.meta.id} title={blog.meta.title} content={blog.body.content} toc={blog.body.toc} />
    </>
  );
}
