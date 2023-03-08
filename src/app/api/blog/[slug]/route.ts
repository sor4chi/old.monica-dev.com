import type { Root } from 'mdast';

import { blogData, blogsData } from '../data';

import { parseMarkdownToHTML } from './../../../../lib/markdown';

import { customFetch } from '@/util/fetcher';

type BlogShowResponse = {
  /** ブログのID */
  id: string;
  /** ブログのSlug */
  slug: string;
  /** ブログのタイトル */
  title: string;
  /** ブログの説明 */
  description: string;
  /** ブログの本文 */
  content: string;
  /** ブログのTOC */
  toc: Root;
  /** ブログのタグ */
  tags: string[];
  /** ブログの作成日 */
  createdAt: string;
};

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = blogsData.find((blog) => blog.slug === slug);
  if (!data) {
    return new Response('Not Found', {
      headers: {
        'content-type': 'text/plain',
      },
      status: 404,
    });
  }

  const parsed = parseMarkdownToHTML(data.content || blogData);

  const response = {
    ...data,
    ...parsed,
  } satisfies BlogShowResponse;

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const fetchGetBlogBySlug = (slug: string) => {
  return customFetch<BlogShowResponse>(`/api/blog/${slug}`);
};
