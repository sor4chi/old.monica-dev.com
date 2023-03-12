import { prisma } from '@/lib/prisma';

/**
 * Get all blogs, ordered by createdAt desc, with pagination
 * Filtered by publishedAt is not null
 *
 * @param page 1-based
 * @param limit
 * @returns blogs
 */
export const getSomePublishedBlogs = async (page: number, limit: number) => {
  const blogs = await prisma.blog.findMany({
    include: {
      BlogTag: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
    where: {
      publishedAt: {
        not: null,
      },
    },
  });

  return blogs.map((blog) => ({
    ...blog,
    BlogTag: undefined,
    tags: blog.BlogTag.map((blogTag) => blogTag.tag),
  }));
};

/**
 * Get all blogs count
 * Filtered by publishedAt is not null
 * @returns blogs count
 */
export const getPublishedBlogsCount = async () => {
  const count = await prisma.blog.count({
    where: {
      publishedAt: {
        not: null,
      },
    },
  });

  return count;
};

/**
 * Get all slugs of blogs
 * Filtered by publishedAt is not null
 *
 * @returns slugs
 */
export const getPublishedBlogSlugs = async () => {
  const slugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
    where: {
      publishedAt: {
        not: null,
      },
    },
  });

  return slugs;
};

/**
 * Get a blog by slug
 * Filtered by publishedAt is not null
 *
 * @param slug
 * @returns blog
 */
export const getPublishedBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
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

  if (!blog) {
    return null;
  }

  if (!blog.publishedAt) {
    return null;
  }

  return {
    ...blog,
    BlogTag: undefined,
    publishedAt: blog.publishedAt,
    tags: blog.BlogTag.map((blogTag) => blogTag.tag),
  };
};