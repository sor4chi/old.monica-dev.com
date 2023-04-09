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

import { ROUTES } from '@/constant/route';
import { useDashboardHeader, useSnackbar } from '@/hooks';
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

type BlogInput = {
  content: string;
  description: string;
  published: boolean;
  slug: string;
  tagIds: number[];
  title: string;
};

type BlogCreateMutationVariables = {
  input: BlogInput;
};

const BlogUpdateMutation = gql`
  ${BlogEditorFormFragment}

  mutation BlogUpdateMutation($id: ID!, $input: BlogInput!) {
    blog: updateBlog(id: $id, input: $input) {
      ...BlogEditorFormFragment
    }
  }
`;

type BlogUpdateMutationResponse = {
  blog: BlogEditorFormFragmentResponse;
};

type BlogUpdateMutationVariables = {
  id: number;
  input: BlogInput;
};

interface Props {
  blog?: BlogEditorFormFragmentResponse;
  setBlog: (blog: BlogEditorFormFragmentResponse) => void;
  tagsOptions: BlogEditorFormTagFragmentResponse[];
}

export const BlogEditorForm = ({ blog, setBlog, tagsOptions }: Props) => {
  const { setDashboardHeaderContent, setTitle } = useDashboardHeader();
  const { form } = useBlogEditor();
  const { control, register, setValue } = form;
  const router = useRouter();
  const { snack } = useSnackbar();

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
    if (!blog) {
      const res = await clientInBrowser.request<BlogCreateMutationResponse, BlogCreateMutationVariables>(
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
      snack(`「${res.blog.title} created!`, {
        action: !!res.blog.publishedAt
          ? {
              label: 'View',
              onClick: () => {
                router.push(ROUTES.BLOG_ARTICLE(res.blog.slug));
              },
            }
          : undefined,
      });
      router.push(ROUTES.DASHBOARD_BLOG_EDIT(res.blog.id));
      return;
    }
    const res = await clientInBrowser.request<BlogUpdateMutationResponse, BlogUpdateMutationVariables>(
      BlogUpdateMutation,
      {
        id: blog.id,
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
    snack(`「${res.blog.title}」updated!`, {
      action: !!res.blog.publishedAt
        ? {
            label: 'View',
            onClick: () => {
              router.push(ROUTES.BLOG_ARTICLE(res.blog.slug));
            },
          }
        : undefined,
    });
    setBlog(res.blog);
  };

  useEffect(() => {
    setDashboardHeaderContent(
      <>
        {blog?.publishedAt && (
          <Link href={`/blog/${blog.slug}`} passHref className={styles.link} target="_blank">
            View
            <MdOpenInNew className={styles.linkIcon} />
          </Link>
        )}
        <Toggle label="Publish" id="toggle-publish" {...register('isPublished')} />
        <Button type="submit" form={BLOG_FORM_ID}>
          {blog ? 'Update' : 'Create'}
        </Button>
      </>,
    );

    return () => {
      setDashboardHeaderContent(null);
    };
  }, [blog]);

  return <BlogEditorFormBody tagsOptions={tagsOptions} onSubmit={onSubmit} />;
};
