import { prisma } from '@/lib/prisma';

/**
 * Create a blog, and associate tags
 *
 * @param blog
 * @param tags
 * @returns blog
 */
export const createBlog = async (
  blog: {
    title: string;
    slug: string;
    description: string;
    content: string;
    published: boolean;
  },
  tags: {
    name: string;
    slug: string;
  }[],
) => {
  const { published, ...blogData } = blog;

  const createdBlog = await prisma.blog.create({
    data: {
      ...blogData,
      BlogTag: {
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              create: {
                name: tag.name,
                slug: tag.slug,
              },
              where: {
                slug: tag.slug,
              },
            },
          },
        })),
      },
      publishedAt: published ? new Date() : null,
    },
    include: {
      BlogTag: {
        include: {
          tag: true,
        },
      },
    },
  });

  return {
    ...createdBlog,
    BlogTag: undefined,
    tags: createdBlog.BlogTag.map((blogTag) => blogTag.tag),
  };
};
