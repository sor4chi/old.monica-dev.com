import { blogsData } from './../data';

import { customFetch } from '@/util/fetcher';

type BlogGetSlugsResponse = string[];

export async function GET(_request: Request) {
  const response = blogsData.map((blog) => blog.slug) satisfies BlogGetSlugsResponse;

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const fetchGetBlogSlugs = () => {
  return customFetch<BlogGetSlugsResponse>(`/api/blog/slugs`);
};