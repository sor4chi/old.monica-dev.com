import type { Blog, Prisma, PrismaClient, Tag } from '@prisma/client';

import fixture from './fixture/blogs.json';

const camelized = (str: string) =>
  str.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));

const fakeDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 10));
  date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date;
};

export const generateBlogs = async (prisma: PrismaClient) => {
  const blogData: Prisma.BlogCreateInput[] = [];

  for (const blog of fixture) {
    const blogTags: Prisma.BlogTagCreateWithoutBlogInput[] = blog.tags.map((tag) => ({
      tag: {
        connectOrCreate: {
          create: {
            name: tag,
            slug: camelized(tag),
          },
          where: {
            slug: camelized(tag),
          },
        },
      },
    }));

    blogData.push({
      BlogTag: {
        create: blogTags,
      },
      content: blog.content,
      description: blog.description,
      publishedAt: Math.random() > 0.2 ? fakeDate() : null,
      slug: blog.slug,
      title: blog.title, // 80% published
    });
  }

  const blogs: (Blog & {
    tags: Tag[];
  })[] = [];
  for (const data of blogData) {
    const res = await prisma.blog.create({
      data,
      include: {
        BlogTag: {
          include: {
            tag: true,
          },
        },
      },
    });
    blogs.push({
      ...res,
      tags: res.BlogTag.map((blogTag) => blogTag.tag),
    });
  }
  return blogs;
};
