import { useEffect, useState } from 'react';

import { BlogForm } from './form';
import type { BlogFormFragmentResponse } from './form/body/query';
import { BlogFormFragment } from './form/body/query';
import { BlogEditorProvider } from './use-blog-editor';

import { clientInBrowser, gql } from '@/lib/graphql';

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

interface Props {
  id?: string;
}

export const BlogEditor = ({ id }: Props) => {
  const [blog, setBlog] = useState<BlogFormFragmentResponse | undefined>(undefined);

  const fetchBlogById = async () => {
    if (!id) return;
    const res = await clientInBrowser.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(
      BlogDetailPageQuery,
      {
        id,
      },
    );
    return res.blogById;
  };

  useEffect(() => {
    fetchBlogById().then((blog) => {
      setBlog(blog);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlogEditorProvider>
      <BlogForm blog={blog} tagOptions={[]} />
    </BlogEditorProvider>
  );
};
