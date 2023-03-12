import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(
  config({
    path: '.env.development',
  }),
);

import { generateBlogs } from './blog';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const main = async () => {
  await Promise.all([generateBlogs(prisma)]);
};

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
