import { z } from 'zod';

import MockBlogData from './data.json';

import { customFetch } from '@/util/fetcher';

const getSomeBlogRequestSchema = z.object({
  count: z.preprocess((v) => Number(v), z.number().min(1)),
  offset: z.preprocess((v) => Number(v), z.number().min(0)),
});

type BlogGetEachResponse = {
  data: {
    /** ブログのID */
    id: string;
    /** ブログのSlug */
    slug: string;
    /** ブログのタイトル */
    title: string;
    /** ブログの本文 */
    description: string;
    /** ブログのタグ */
    tags: string[];
    /** ブログの作成日 */
    createdAt: string;
  }[];
  /** ブログの総数 */
  total: number;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { count, offset } = getSomeBlogRequestSchema.parse({
    count: searchParams.get('count'),
    offset: searchParams.get('offset'),
  });

  const response = {
    data: MockBlogData.slice(offset, offset + count),
    total: MockBlogData.length,
  } satisfies BlogGetEachResponse;

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const fetchGetSomeBlog = (params: z.infer<typeof getSomeBlogRequestSchema>) => {
  const { count, offset } = params;
  const query = new URLSearchParams({
    count: String(count),
    offset: String(offset),
  });
  return customFetch<BlogGetEachResponse>(`/api/blog?${query}`);
};
