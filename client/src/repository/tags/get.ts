import { prisma } from '@/lib/prisma';

/**
 * Get all tags
 *
 * @returns tags
 */
export const getAllTags = async () => {
  const tags = await prisma.tag.findMany();

  return tags;
};
