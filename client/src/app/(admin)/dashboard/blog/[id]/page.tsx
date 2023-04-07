import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { serverEnv } from '@/env/server';
import { client, gql } from '@/lib/graphql';
import { BlogForm } from '@/ui/feature/blog/editor/form';
import { BlogFormFragment } from '@/ui/feature/blog/editor/form/body/query';
import type { BlogFormFragmentResponse } from '@/ui/feature/blog/editor/form/body/query';

interface Props {
  params: {
    id: string;
  };
}

const BlogDetailPageQuery = gql`
  ${BlogFormFragment}

  query BlogDetailQuery($id: ID!) {
    blogById(id: $id) {
      ...BlogFormFragment
    }
  }
`;

type BlogDetailPageQueryResponse = {
  blogById: BlogFormFragmentResponse;
};

type BlogDetailPageQueryVariables = {
  id: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await client.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(BlogDetailPageQuery, {
    id: params.id,
  });

  return {
    title: `(編集中) ${res.blogById.title}`,
  };
}

async function getData(id: string) {
  try {
    const res = await client.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(BlogDetailPageQuery, {
      id,
    });
    return { blog: res.blogById };
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
  const { blog } = await getData(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogForm blog={blog} tagOptions={[]} />
    </>
  );
}
