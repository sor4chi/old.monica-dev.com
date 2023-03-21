import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { serverEnv } from '@/env/server';
import { getBlogBySlug, getPublishedBlogBySlug } from '@/repository/blog';
import { BlogForm } from '@/ui/feature/blog/form';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getPublishedBlogBySlug(params.slug);

  if (!res) {
    return {
      robots: 'noindex',
    };
  }

  return {
    robots: 'noindex',
    title: `(編集中) ${res.title}`,
  };
}

async function getBlog(slug: string) {
  try {
    const res = await getBlogBySlug(slug);
    if (!res) {
      return null;
    }

    return {
      ...res,
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
      <BlogForm blog={blog} />
    </>
  );
}
