import { blogData, blogsData } from '../data';

import { parseMarkdownToHTML } from '@/lib/markdown';
import { customFetch } from '@/util/fetcher';

interface TocItem {
  /** ヘッダーのレベル */
  depth: number;
  /** ヘッダーのテキスト */
  value: string;
  /** ヘッダーの属性データ */
  data: {
    id: string;
  };
  /** ヘッダーの子要素 */
  children: TocItem[];
}

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
  toc: TocItem[];
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
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const fetchGetBlogBySlug = (slug: string) => {
  return customFetch<BlogShowResponse>(`/api/blog/${slug}`);
};
