import Link from 'next/link';
import { useEffect } from 'react';
import { MdOpenInNew } from 'react-icons/md';

import { BLOG_FORM_ID, useBlogEditor } from '../use-blog-editor';

import { BlogEditorFormBody } from './body';
import type { BlogEditorFormFragmentResponse } from './body';
import * as styles from './form.css';
import type { BlogEditorFormTagFragmentResponse } from './tag';

import { useDashboardHeader } from '@/hooks';
import { Button } from '@/ui/foundation/button';
import { Toggle } from '@/ui/foundation/toggle';

interface Props {
  blog?: BlogEditorFormFragmentResponse;
  tagsOptions: BlogEditorFormTagFragmentResponse[];
  mode: 'create' | 'edit';
}

export const BlogEditorForm = ({ blog, mode, tagsOptions }: Props) => {
  const { setDashboardHeaderContent, setTitle } = useDashboardHeader();
  const { form } = useBlogEditor();
  const { getValues, register, setValue } = form;

  useEffect(() => {
    if (!blog) return;
    setValue('content', blog.content);
    setValue('description', blog.description);
    setValue('slug', blog.slug);
    setValue(
      'tags',
      blog.tags.map((tag) => tag.id),
    );
    setValue('title', blog.title);
    setValue('isPublished', blog.publishedAt !== null);
    setTitle(blog.title);
  }, [blog, setValue, setTitle]);

  const onSubmitButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = getValues();
    console.log(data);
  };

  useEffect(() => {
    setDashboardHeaderContent(
      <>
        {mode === 'edit' && blog?.publishedAt && (
          <Link href={`/blog/${blog.slug}`} passHref className={styles.link}>
            View
            <MdOpenInNew className={styles.linkIcon} />
          </Link>
        )}
        <Toggle label="Publish" id="toggle-publish" {...register('isPublished')} />
        <Button type="submit" form={BLOG_FORM_ID} onClick={onSubmitButtonClick}>
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </>,
    );

    return () => {
      setDashboardHeaderContent(null);
    };
  }, [blog]);

  return <BlogEditorFormBody tagsOptions={tagsOptions} />;
};
