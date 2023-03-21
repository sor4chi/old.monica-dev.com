import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import * as styles from './form.css';

import { parseMarkdownToHTML } from '@/lib/markdown';
import { Article } from '@/ui/foundation/article';
import { Button } from '@/ui/foundation/button';
import { TextInput } from '@/ui/foundation/textInput';
import { Textarea } from '@/ui/foundation/textarea';
import { Toggle } from '@/ui/foundation/toggle';

const scheme = z.object({
  content: z.string().min(1, { message: '本文を入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
});

type Scheme = z.infer<typeof scheme>;

const postBlog = async (params: Scheme) => {
  console.log(params);
};

interface Props {
  blog: {
    id: number;
    title: string;
    description: string;
    content: string;
  };
}

const removeBlogFromLocalStorageById = (id: number) => {
  const blogForm = localStorage.getItem('blogForm');
  if (blogForm) {
    const parsed = JSON.parse(blogForm);
    const filtered = parsed.filter((blog: { id: number }) => blog.id !== id);
    localStorage.setItem('blogForm', JSON.stringify(filtered));
  }
};

const updateBlogFromLocalStorageById = (id: number, data: Scheme) => {
  const blogForm = localStorage.getItem('blogForm');
  if (blogForm) {
    const parsed = JSON.parse(blogForm);
    const filtered = parsed.filter((blog: { id: number }) => blog.id !== id);
    const updated = [...filtered, { id, ...data }];
    localStorage.setItem('blogForm', JSON.stringify(updated));
  } else {
    localStorage.setItem('blogForm', JSON.stringify([{ id, ...data }]));
  }
};

const getBlogFromLocalStorageById = (id: number) => {
  const blogForm = localStorage.getItem('blogForm');
  if (blogForm) {
    const parsed = JSON.parse(blogForm);
    const filtered = parsed.filter((blog: { id: number }) => blog.id === id);
    return filtered[0];
  }
};

export const BlogForm = ({ blog }: Props) => {
  const [phase, setPhase] = useState<'form' | 'success'>('form');
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });
  const formData = watch();
  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = (d: Scheme) => {
    postBlog(d);
    setPhase('success');
    setValue('description', '');
    setValue('title', '');
    removeBlogFromLocalStorageById(blog.id);
  };

  const handleChange = () => {
    updateBlogFromLocalStorageById(blog.id, formData);
  };

  useEffect(() => {
    const data = getBlogFromLocalStorageById(blog.id);
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('content', data.content);
    } else {
      setValue('title', blog.title);
      setValue('description', blog.description);
      setValue('content', blog.content);
    }
  }, []);

  if (phase === 'success') {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <section className={styles.meta}>
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
      </section>
      <section>
        <div className={styles.contentHeader}>
          <label htmlFor="content">Content</label>
          <div className={styles.previewSetting}>
            <label htmlFor="toggle-show-preview">プレビューを表示</label>
            <Toggle
              id="toggle-show-preview"
              label="プレビュー"
              checked={showPreview}
              onChange={() => setShowPreview(!showPreview)}
            />
          </div>
        </div>
        <div className={styles.contentEditor}>
          <Textarea
            id="content"
            placeholder="ブログの本文"
            height={styles.PREVIEW_EDITOR_HEIGHT}
            {...register('content')}
            error={errors.content?.message}
          />
          <div className={styles.preview[showPreview ? 'show' : 'hide']}>
            <Article content={parseMarkdownToHTML(getValues('content') || '').content} />
          </div>
        </div>
      </section>
      <Button type="submit">Submit</Button>
    </form>
  );
};
