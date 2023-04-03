import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createCtx } from '@/util/context';

const schema = z.object({
  content: z.string().min(1, { message: '本文を入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
  slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
  tags: z.array(
    z.object({
      name: z.string(),
      slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
    }),
  ),
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
});

type Schema = z.infer<typeof schema>;

type IBlogFormContext = {
  form: UseFormReturn<Schema>;
};

const [useBlogForm, SetBlogFormProvider] = createCtx<IBlogFormContext>();

export { useBlogForm };

export const BLOG_FORM_ID = 'blogForm';

const useBlogFormCtx = (): IBlogFormContext => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  return {
    form,
  };
};

interface Props {
  children: ReactNode;
}

export const BlogFormProvider = ({ children }: Props) => {
  const BlogForm = useBlogFormCtx();
  return <SetBlogFormProvider value={BlogForm}>{children}</SetBlogFormProvider>;
};
