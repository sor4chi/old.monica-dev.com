import RSS from 'rss';

import { ROUTES } from '@/constant/route';
import { SITE_CONFIG } from '@/constant/site';
import { client, gql } from '@/lib/graphql';
import { getSafelyDate } from '@/util/date';
import { getOgUrl } from '@/util/og';

const query = gql`
  query BlogListQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs(input: { limit: $limit, offset: $offset, tags: $tags }) {
      total
      data {
        title
        description
        slug
        publishedAt
        tags {
          name
        }
      }
    }
  }
`;

export type BlogListQueryResponse = {
  blogs: {
    total: number;
    data: {
      title: string;
      description: string;
      slug: string;
      publishedAt: string;
      tags: {
        name: string;
      }[];
    }[];
  };
};

const TTL = 86400;

export const GET = async (_request: Request) => {
  const feed = new RSS({
    categories: ['blog'],
    description: SITE_CONFIG.DESCRIPTION,
    feed_url: `${SITE_CONFIG.URL}${ROUTES.FEED}`,
    image_url: getOgUrl(SITE_CONFIG.TITLE),
    language: 'ja',
    pubDate: new Date().toUTCString(),
    site_url: SITE_CONFIG.URL,
    title: SITE_CONFIG.TITLE,
    ttl: TTL,
  });

  const response = await client.request<BlogListQueryResponse>(query, {
    limit: 999,
    offset: 0,
  });

  response.blogs.data.forEach((blog) => {
    feed.item({
      categories: blog.tags.map((tag) => tag.name),
      date: new Date(getSafelyDate(blog.publishedAt)).toUTCString(),
      description: blog.description,
      title: blog.title,
      url: `${SITE_CONFIG.URL}/blog/${blog.slug}`,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      'Cache-Control': `s-maxage=${TTL}, stale-while-revalidate`,
      'Content-Type': 'text/xml; charset=UTF-8',
    },
  });
};
