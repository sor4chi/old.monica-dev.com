import { useEffect, useState } from 'react';

import { BlogFormBody } from './body';
import type { BlogFormFragmentResponse } from './body/query';
import { BLOG_FORM_ID, BlogFormProvider } from './use-blog-form';

import { useDashboardHeader } from '@/hooks';
import { Button } from '@/ui/foundation/button';
import { Toggle } from '@/ui/foundation/toggle';

interface Props {
  blog: BlogFormFragmentResponse;
  tagOptions: {
    slug: string;
    name: string;
  }[];
}

export const BlogForm = ({ blog, tagOptions: _ }: Props) => {
  const [isPublished, setIsPublished] = useState(blog.publishedAt !== null);
  const { setDashboardHeaderContent } = useDashboardHeader();

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

  return (
    <BlogFormProvider>
      <BlogFormBody />
    </BlogFormProvider>
  );
};
