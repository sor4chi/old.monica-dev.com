import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { serverEnv } from '@/env/server';
import { clientSSR, gql } from '@/lib/graphql-ssr';
import { BlogForm } from '@/ui/feature/blog/form';
import { BlogFormFragment } from '@/ui/feature/blog/form/body/query';
import type { BlogFormFragmentResponse } from '@/ui/feature/blog/form/body/query';

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
  blog: BlogFormFragmentResponse;
};

type BlogDetailPageQueryVariables = {
  id: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await clientSSR.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(BlogDetailPageQuery, {
    id: params.id,
  });

  return {
    robots: 'noindex',
    title: `(編集中) ${res.blog.title}`,
  };
}

async function getData(id: string) {
  try {
    const res = await clientSSR.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(
      BlogDetailPageQuery,
      {
        id,
      },
    );
    return { blog: res.blog };
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
