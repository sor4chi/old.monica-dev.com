import { useEffect, useState } from 'react';

import { BLOG_FORM_ID, useBlogEditor } from '../use-blog-editor';

import { BlogFormBody } from './body';
import type { BlogFormFragmentResponse } from './body/query';

import { useDashboardHeader } from '@/hooks';
import { Button } from '@/ui/foundation/button';
import { Toggle } from '@/ui/foundation/toggle';

interface Props {
  blog?: BlogFormFragmentResponse;
  tagOptions: {
    slug: string;
    name: string;
  }[];
}

export const BlogForm = ({ blog, tagOptions: _ }: Props) => {
  const [isPublished, setIsPublished] = useState(false);
  const { setDashboardHeaderContent, setTitle } = useDashboardHeader();
  const { form } = useBlogEditor();
  const { setValue } = form;

  const setBlogToForm = (blog: BlogFormFragmentResponse) => {
    setValue('content', blog.content);
    setValue('description', blog.description);
    setValue('slug', blog.slug);
    setValue('tags', blog.tags);
    setValue('title', blog.title);
  };

  useEffect(() => {
    if (blog) {
      setBlogToForm(blog);
      setTitle(blog.title);
      setIsPublished(blog.publishedAt !== null);
    }
  }, [blog]);

  const onSubmitButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // const data = getValues();
    // const newBlog = await updateBlog(blog.slug, {
    //   ...data,
    //   published: isPublished,
    // });
    // if (newBlog) {
    // removeBlogFromLocalStorageById(blog.id);
    // }
  };

  useEffect(() => {
    setDashboardHeaderContent(
      <>
        <Toggle
          label="公開する"
          id="toggle-publish"
          onChange={() => setIsPublished(!isPublished)}
          checked={isPublished}
        />
        <Button type="submit" form={BLOG_FORM_ID} onClick={onSubmitButtonClick}>
          Save
        </Button>
      </>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublished]);

  return <BlogFormBody />;
};
