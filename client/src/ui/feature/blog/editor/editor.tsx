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

interface Props {
  id?: string;
  mode: 'create' | 'edit';
}

export const BlogEditor = ({ id, mode }: Props) => {
  const [blog, setBlog] = useState<BlogEditorFormFragmentResponse | undefined>(undefined);
  const [tagsOptions, setTagsOptions] = useState<BlogEditorFormTagFragmentResponse[]>([]);

  const fetches = async () => {
    if (!id) return;
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
      <BlogEditorForm blog={blog} tagsOptions={tagsOptions} mode={mode} />
    </BlogEditorProvider>
  );
};