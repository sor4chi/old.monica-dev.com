import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createCtx } from '@/util/context';

const schema = z.object({
  content: z.string().min(1, { message: '本文を入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
  isPublished: z.boolean(),
  slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
  tagIds: z.preprocess((value) => {
    if (!Array.isArray(value)) return [];
    return value.map((v) => Number(v));
  }, z.array(z.number())),
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
});

export type BlogFormSchema = z.infer<typeof schema>;

type IBlogEditorContext = {
  form: UseFormReturn<BlogFormSchema>;
};

const [useBlogEditor, SetBlogEditorProvider] = createCtx<IBlogEditorContext>();

export { useBlogEditor };

export const BLOG_FORM_ID = 'blogForm';

const useBlogEditorCtx = (): IBlogEditorContext => {
  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(schema),
  });

  return {
    form,
  };
};

interface Props {
  children: ReactNode;
}

export const BlogEditorProvider = ({ children }: Props) => {
  const BlogEditor = useBlogEditorCtx();
  return <SetBlogEditorProvider value={BlogEditor}>{children}</SetBlogEditorProvider>;
};
