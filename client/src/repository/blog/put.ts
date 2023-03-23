import { prisma } from '@/lib/prisma';

/**
 * Update a blog, and associate tags
 *
 * @param blog
 * @param tags
 * @returns blog
 */
export const updateBlogBySlug = async (
  slug: string,
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
  const currentBlog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  if (!currentBlog) {
    return null;
  }

  await prisma.blogTag.deleteMany({
    where: {
      blogId: currentBlog.id,
    },
  });

  const { published, ...rest } = blog;

  const newPublishedAt = published ? currentBlog.publishedAt || new Date() : null;

  const updatedBlog = await prisma.blog.update({
    data: {
      ...rest,
      BlogTag: {
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              create: tag,
              where: {
                slug: tag.slug,
              },
            },
          },
        })),
      },
      publishedAt: newPublishedAt,
    },
    include: {
      BlogTag: {
        include: {
          tag: true,
        },
      },
    },
    where: {
      slug,
    },
  });

  return {
    ...updatedBlog,
    BlogTag: undefined,
    tags: updatedBlog.BlogTag.map((blogTag) => blogTag.tag),
  };
};
