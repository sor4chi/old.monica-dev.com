import { readdir, readFileSync } from 'fs';
import { join } from 'path';

import { XMLParser } from 'fast-xml-parser';

import {
  Blog,
  BlogDetail,
  OriginalBlogFrontMatter,
  QiitaAPI,
  ZennFeed,
} from '#/types/blog';
import { escapeEdgeQuotes, strArrToArr } from '#/utils/string';

const parser = new XMLParser();

const BLOG_DIR = join(process.cwd(), 'docs/blogs');
const ZENN_UID = 'monica';
const ZENN_FEED_URL = `https://zenn.dev/${ZENN_UID}/feed?all=1`;
const QIITA_API_URL = `https://qiita.com/api/v2/authenticated_user/items`;
const QIITA_ACCESS_TOKEN = process.env.QIITA_ACCESS_TOKEN;

export const getBlogByZenn = async (): Promise<Blog[]> => {
  const res = await fetch(ZENN_FEED_URL, {
    cache: 'force-cache',
  });
  const xml = await res.text();
  const data: ZennFeed = await parser.parse(xml);

  return data.rss.channel.item.map((item) => {
    return {
      type: 'zenn',
      title: item.title,
      url: item.link,
      date: item.pubDate,
      tags: item.category || [],
      description: item.description,
      published: true,
    };
  });
};

export const getBlogByQiita = async (): Promise<Blog[]> => {
  const res = await fetch(QIITA_API_URL, {
    headers: {
      Authorization: `Bearer ${QIITA_ACCESS_TOKEN}`,
    },
    cache: 'force-cache',
  });
  const data: QiitaAPI = await res.json();
  return data.map((item) => {
    return {
      type: 'qiita',
      title: item.title,
      url: item.url,
      date: item.created_at,
      tags: item.tags.map((tag) => tag.name),
      description: item.body,
      published: true,
    };
  });
};

export const parseMdWithFrontMatter = (content: string): BlogDetail => {
  const frontMatter = content.match(/---(.|\s)*?---/);
  if (!frontMatter) throw new Error('frontMatter is not found');
  const contentWithoutFrontMatter = content.replace(frontMatter[0], '');

  const frontMatterObj = frontMatter[0]
    .replace(/---/g, '')
    .split('\n')
    .filter((line) => line)
    .reduce((acc, cur) => {
      const [key, value] = cur.split(': ');
      return {
        ...acc,
        [key]: escapeEdgeQuotes(value),
      };
    }, {}) as OriginalBlogFrontMatter;

  return {
    type: 'original',
    title: frontMatterObj.title,
    date: frontMatterObj.date,
    tags: strArrToArr(frontMatterObj.tags).map(escapeEdgeQuotes),
    description: frontMatterObj.description,
    published: frontMatterObj.published,
    content: contentWithoutFrontMatter,
  };
};

export const getOriginalBlog = async (): Promise<Blog[]> => {
  const files = await new Promise<string[]>((resolve) => {
    readdir(BLOG_DIR, (err, files) => {
      if (err) throw err;
      resolve(files);
    });
  });
  return files.map((file) => {
    const content = readFileSync(join(BLOG_DIR, file), 'utf-8');
    return {
      ...parseMdWithFrontMatter(content),
      slug: file.replace(/\.md$/, ''),
    };
  });
};

export const getOriginalBlogBySlug = async (
  slug: string,
): Promise<BlogDetail> => {
  const content = readFileSync(join(BLOG_DIR, `${slug}.md`), 'utf-8');

  return {
    ...parseMdWithFrontMatter(content),
    slug,
  };
};
