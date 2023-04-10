import { useEffect, useState } from 'react';

import { BlogEditorForm } from './form';
import type { BlogEditorFormFragmentResponse } from './form/body';
import { BlogEditorFormFragment } from './form/body';
import type { BlogEditorFormTagFragmentResponse } from './form/tag';
import { BlogEditorFormTagFragment } from './form/tag';
import { BlogEditorProvider } from './use-blog-editor';

import { clientInBrowser, gql } from '@/lib/graphql';

const BlogDetailPageQuery = gql`
  ${BlogEditorFormFragment}
  ${BlogEditorFormTagFragment}

  query BlogDetailQuery($id: ID!) {
    blog: blogById(id: $id) {
      ...BlogEditorFormFragment
    }
    tags: tags {
      ...BlogEditorFormTagFragment
    }
  }
`;

type BlogDetailPageQueryResponse = {
  blog: BlogEditorFormFragmentResponse;
  tags: BlogEditorFormTagFragmentResponse[];
};

type BlogDetailPageQueryVariables = {
  id: string;
};

const BlogCreatePageQuery = gql`
  ${BlogEditorFormTagFragment}

  query GetTagsQuery {
    tags: tags {
      ...BlogEditorFormTagFragment
    }
  }
`;

type BlogCreatePageQueryResponse = {
  tags: BlogEditorFormTagFragmentResponse[];
  blog: undefined;
};

interface Props {
  id?: string;
}

export const BlogEditor = ({ id }: Props) => {
  const [blog, setBlog] = useState<BlogEditorFormFragmentResponse | undefined>(undefined);
  const [tagsOptions, setTagsOptions] = useState<BlogEditorFormTagFragmentResponse[]>([]);

  const fetches = async (): Promise<BlogDetailPageQueryResponse | BlogCreatePageQueryResponse> => {
    if (!id) {
      const res = await clientInBrowser.request<BlogCreatePageQueryResponse>(BlogCreatePageQuery);
      return res;
    }
    const res = await clientInBrowser.request<BlogDetailPageQueryResponse, BlogDetailPageQueryVariables>(
      BlogDetailPageQuery,
      {
        id,
      },
    );
    return res;
  };

  useEffect(() => {
    fetches().then((res) => {
      setBlog(res?.blog);
      setTagsOptions(res?.tags || []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlogEditorProvider>
      <BlogEditorForm blog={blog} setBlog={setBlog} tagsOptions={tagsOptions} />
    </BlogEditorProvider>
  );
};
