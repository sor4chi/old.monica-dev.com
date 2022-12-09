import { faker } from '@faker-js/faker';
import { Blog, BlogOnTags, Prisma, PrismaClient, User } from '@prisma/client';

import { SEEDER_CONFIG } from './_config';

const generateFakeBlogContent = () => {
  const content = [];
  const PREFIXES = [
    '#',
    '##',
    '###',
    '-',
    '>',
    ['**', '**'],
    ['```\n', '\n```'],
  ];
  for (let i = 0; i < 10; i++) {
    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    if (Array.isArray(prefix)) {
      content.push(`${prefix[0]}${faker.lorem.sentence()}${prefix[1]}`);
    } else {
      content.push(`${prefix} ${faker.lorem.sentence()}`);
    }
  }
  return content.join('\n');
};

const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export const generateBlogs = async (prisma: PrismaClient) => {
  const blogData: Prisma.BlogCreateInput[] = [];
  for (let i = 0; i < SEEDER_CONFIG.BLOG_LENGTH; i++) {
    const isExternalBlog = faker.datatype.boolean();
    const blogProvider =
      SEEDER_CONFIG.BLOG_PROVIDER_LIST[
        Math.floor(Math.random() * SEEDER_CONFIG.BLOG_PROVIDER_LIST.length)
      ];
    const blogTags = Array.from(
      {
        length: Math.floor(Math.random() * SEEDER_CONFIG.BLOG_TAG_LENGTH),
      },
      () => {
        const slug = faker.word.noun();
        return {
          tag: {
            slug,
            name: camelize(slug),
          },
        };
      },
    );

    blogData.push({
      slug: faker.lorem.slug(),
      title: faker.lorem.words(),
      content: !isExternalBlog ? generateFakeBlogContent() : undefined,
      link: isExternalBlog ? faker.internet.url() : undefined,
      published: faker.datatype.boolean(),
      author: {
        create: {
          role: {
            create: {
              role: SEEDER_CONFIG.ROLE_LIST[
                Math.floor(Math.random() * SEEDER_CONFIG.ROLE_LIST.length)
              ],
            },
          },
        },
      },
      tags: {
        create: blogTags.map((tag) => ({
          tag: {
            create: tag.tag,
          },
        })),
      },
      provider: isExternalBlog
        ? {
            connectOrCreate: {
              create: blogProvider,
              where: {
                slug: blogProvider.slug,
              },
            },
          }
        : undefined,
    });
  }

  const blogs: (Blog & {
    tags: BlogOnTags[];
    author: User;
  })[] = [];
  for (const data of blogData) {
    const res = await prisma.blog.create({
      data,
      include: {
        author: true,
        tags: true,
      },
    });
    blogs.push(res);
  }
  return blogs;
};
