import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { MdOpenInNew } from 'react-icons/md';

import type { BlogFormSchema } from '../use-blog-editor';
import { BLOG_FORM_ID, useBlogEditor } from '../use-blog-editor';

import { BlogEditorFormBody, BlogEditorFormFragment } from './body';
import type { BlogEditorFormFragmentResponse } from './body';
import * as styles from './form.css';
import type { BlogEditorFormTagFragmentResponse } from './tag';

import { useDashboardHeader } from '@/hooks';
import { clientInBrowser, gql } from '@/lib/graphql';
import { Button } from '@/ui/foundation/button';
import { Toggle } from '@/ui/foundation/toggle';

const BlogCreateMutation = gql`
  ${BlogEditorFormFragment}

  mutation BlogCreateMutation($input: BlogInput!) {
    blog: createBlog(input: $input) {
      ...BlogEditorFormFragment
    }
  }
`;

type BlogCreateMutationResponse = {
  blog: BlogEditorFormFragmentResponse;
};

type BlogCreateMutationVariables = {
  input: {
    content: string;
    description: string;
    slug: string;
    tagIds: number[];
    title: string;
    published: boolean;
  };
};

interface Props {
  blog?: BlogEditorFormFragmentResponse;
  tagsOptions: BlogEditorFormTagFragmentResponse[];
  mode: 'create' | 'edit';
}

export const BlogEditorForm = ({ blog, mode, tagsOptions }: Props) => {
  const { setDashboardHeaderContent, setTitle } = useDashboardHeader();
  const { form } = useBlogEditor();
  const { control, register, setValue } = form;
  const router = useRouter();

  const setBlogFields = useCallback(
    (blog: BlogEditorFormFragmentResponse) => {
      setValue('content', blog.content);
      setValue('description', blog.description);
      setValue('slug', blog.slug);
      setValue(
        'tagIds',
        blog.tags.map((tag) => tag.id),
      );
      setValue('title', blog.title);
      setValue('isPublished', Boolean(blog.publishedAt));
      setTitle(blog.title);
    },
    [setValue, setTitle],
  );

  useEffect(() => {
    if (blog) {
      setBlogFields(blog);
    }
  }, [blog, setBlogFields]);

  const title = useWatch({
    control,
    name: 'title',
  });

  useEffect(() => {
    setTitle(title);

    return () => {
      setTitle('');
    };
  }, [title, setTitle]);

  const onSubmit = async (data: BlogFormSchema) => {
    if (mode === 'create') {
      const response = await clientInBrowser.request<BlogCreateMutationResponse, BlogCreateMutationVariables>(
        BlogCreateMutation,
        {
          input: {
            content: data.content,
            description: data.description,
            published: data.isPublished,
            slug: data.slug,
            tagIds: data.tagIds,
            title: data.title,
          },
        },
      );
      router.push(`/dashboard/blog/${response.blog.id}`);
    }
  };

  useEffect(() => {
    setDashboardHeaderContent(
      <>
        {mode === 'edit' && blog?.publishedAt && (
          <Link href={`/blog/${blog.slug}`} passHref className={styles.link} target="_blank">
            View
            <MdOpenInNew className={styles.linkIcon} />
          </Link>
        )}
        <Toggle label="Publish" id="toggle-publish" {...register('isPublished')} />
        <Button type="submit" form={BLOG_FORM_ID}>
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </>,
    );

    return () => {
      setDashboardHeaderContent(null);
    };
  }, [blog]);

  return <BlogEditorFormBody tagsOptions={tagsOptions} onSubmit={onSubmit} />;
};
