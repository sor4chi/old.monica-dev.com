import { z } from 'zod';

import { createBlog } from '@/repository/blog/post';
import { updateBlogBySlug } from '@/repository/blog/put';
import type { RemovePromise } from '@/util/primsie';

const postBlogScheme = z.object({
  content: z.string().min(1, { message: '本文は必須です' }),
  description: z.string().min(1, { message: '説明文は必須です' }),
  published: z.boolean(),
  slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
  tags: z.array(
    z.object({
      name: z.string().min(1, { message: 'タグ名は必須です' }),
      slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
    }),
  ),
  title: z.string().min(1, { message: 'タイトルは必須です' }),
});

interface Segments {
  params: {
    slug: string;
  };
}

export async function POST(request: Request, segments: Segments) {
  const { slug } = segments.params;
  const body = await request.json();
  const params = postBlogScheme.safeParse(body);
  if (!params.success) {
    return new Response(
      JSON.stringify({
        message: params.error.issues.map((issue) => issue.message),
      }),
      { status: 400 },
    );
  }

  const { content, description, published, tags, title } = params.data;

  const blog = await createBlog(
    {
      content,
      description,
      published,
      slug,
      title,
    },
    tags,
  );

  return new Response(JSON.stringify(blog), { status: 200 });
}

export type PostBlogResponse = RemovePromise<ReturnType<typeof createBlog>>;

export async function PUT(request: Request, segments: Segments) {
  const { slug: updateSlug } = segments.params;
  const body = await request.json();
  const params = postBlogScheme.safeParse(body);
  if (!params.success) {
    return new Response(
      JSON.stringify({
        message: params.error.issues.map((issue) => issue.message),
      }),
      { status: 400 },
    );
  }

  const { tags, ...blogData } = params.data;

  const blog = await updateBlogBySlug(updateSlug, blogData, tags);

  return new Response(JSON.stringify(blog), { status: 200 });
}

export type PutBlogResponse = RemovePromise<ReturnType<typeof updateBlogBySlug>>;
