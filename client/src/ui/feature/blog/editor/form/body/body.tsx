import { clsx } from 'clsx';
import { useMemo, useState } from 'react';
import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import type { BlogFormSchema } from '../../use-blog-editor';
import { BLOG_FORM_ID, useBlogEditor } from '../../use-blog-editor';
import { BlogEditorFormTag } from '../tag';

import * as styles from './body.css';

import { clientEnv } from '@/env/client';
import { gql } from '@/lib/graphql';
import { parseMarkdownToHTML } from '@/lib/markdown';
import { Article } from '@/ui/foundation/article';
import { TextInput } from '@/ui/foundation/textInput';
import { Textarea } from '@/ui/foundation/textarea';
import { Toggle } from '@/ui/foundation/toggle';

export const BlogEditorFormFragment = gql`
  fragment BlogEditorFormFragment on Blog {
    id
    slug
    title
    description
    content
    publishedAt
    tags {
      id
    }
  }
`;

export type BlogEditorFormFragmentResponse = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string | null;
  tags: {
    id: number;
  }[];
};

interface Props {
  tagsOptions: {
    id: number;
    slug: string;
    name: string;
  }[];
  onSubmit: (data: BlogFormSchema) => void;
}

const handleFileDrop = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT.replace('/query', '/upload'), {
    body: formData,
    credentials: 'include',
    method: 'POST',
  });
  const data = await res.json();
  return data.url;
};

export const BlogEditorFormBody = ({ onSubmit, tagsOptions }: Props) => {
  const [contentEditorOptions, setContentEditorOptions] = useState({
    fullscreen: false,
    preview: false,
  });

  const { form } = useBlogEditor();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  return (
    <form className={styles.form} id={BLOG_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      {JSON.stringify(errors.tagIds)}
      <section className={styles.metaArea}>
        <TextInput
          label="Title"
          id="title"
          placeholder="ブログのタイトル"
          {...register('title')}
          error={errors.title?.message}
        />
        <TextInput
          label="Description"
          id="description"
          placeholder="ブログの説明・要約"
          {...register('description')}
          error={errors.description?.message}
        />
        <TextInput
          label="Slug"
          id="slug"
          placeholder="ブログのURLスラッグ"
          {...register('slug')}
          error={errors.slug?.message}
        />
        <BlogEditorFormTag tagsOptions={tagsOptions} />
      </section>
      <section className={clsx(styles.contentEditor, contentEditorOptions.fullscreen && styles.contentFullScreen)}>
        <div className={styles.contentHeader}>
          <label htmlFor="content" className={styles.previewLabel}>
            Content
          </label>
          <div className={styles.contentEditorOptions}>
            <Toggle
              id="toggle-fullscreen"
              label="Fullscreen"
              checked={contentEditorOptions.fullscreen}
              onChange={() =>
                setContentEditorOptions({ ...contentEditorOptions, fullscreen: !contentEditorOptions.fullscreen })
              }
            />
            <Toggle
              id="toggle-show-preview"
              label="Preview"
              checked={contentEditorOptions.preview}
              onChange={() =>
                setContentEditorOptions({ ...contentEditorOptions, preview: !contentEditorOptions.preview })
              }
            />
          </div>
        </div>
        <div className={styles.contentEditorBody}>
          <Textarea
            id="content"
            placeholder="ブログの本文"
            height={styles.contentEditorVars.bodyHeight}
            {...register('content')}
            error={errors.content?.message}
            onFileDrop={handleFileDrop}
          />
          <div className={styles.preview[contentEditorOptions.preview ? 'show' : 'hide']}>
            <BlogContentPreview control={control} />
          </div>
        </div>
      </section>
    </form>
  );
};

const BlogContentPreview = ({ control }: { control: Control<BlogFormSchema> }) => {
  const content = useWatch({
    control,
    name: 'content',
  });

  const parsedContent = useMemo(() => parseMarkdownToHTML(content).content, [content]);

  return <Article content={parsedContent} imgOptimize={false} />;
};
