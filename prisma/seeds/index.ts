import { PrismaClient } from '@prisma/client';

import { generateBlogs } from './blog';
import { generateTimeline } from './timeline';

const prisma = new PrismaClient();

const main = async () => {
  await Promise.all([generateTimeline(prisma), generateBlogs(prisma)]);
};

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
