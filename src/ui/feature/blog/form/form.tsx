import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import * as styles from './form.css';

import { Button } from '@/ui/foundation/button';
import { TextInput } from '@/ui/foundation/textInput';
import { Textarea } from '@/ui/foundation/textarea';

const scheme = z.object({
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
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });
  const formData = watch();

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
      setValue('description', data.description);
      setValue('title', data.title);
    } else {
      setValue('description', blog.description);
      setValue('title', blog.title);
    }
  }, []);

  if (phase === 'success') {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <TextInput
        label="Title"
        id="title"
        placeholder="ブログのタイトル"
        {...register('title')}
        error={errors.title?.message}
      />
      <Textarea
        label="Description"
        id="description"
        placeholder="ブログの説明・要約"
        style={{ resize: 'none' }}
        rows={5}
        {...register('description')}
        error={errors.description?.message}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
