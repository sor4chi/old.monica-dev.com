import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { serverEnv } from '@/env/server';
import { getBlogBySlug, getPublishedBlogBySlug } from '@/repository/blog';
import { getAllTags } from '@/repository/tags';
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

async function getData(slug: string) {
  try {
    const [blog, tags] = await Promise.all([getBlogBySlug(slug), getAllTags()]);
    return { blog, tagOptions: tags };
  } catch (e) {
    if (serverEnv.NODE_ENV === 'development') {
      console.log(e);
    }
    return {
      blog: null,
      tagOptions: [],
    };
  }
}

export default async function BlogDetail({ params }: Props) {
  const { blog, tagOptions } = await getData(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogForm blog={blog} tagOptions={tagOptions} />
    </>
  );
}
