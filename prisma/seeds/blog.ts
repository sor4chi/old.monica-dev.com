import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient, User } from "@prisma/client";

export const BLOG_LENGTH = 10;

const prisma = new PrismaClient();

export const generateBlogs = async (users: User[]) => {
  const blogData: Prisma.BlogCreateManyInput[] = [];
  for (let i = 0; i < BLOG_LENGTH; i++) {
    blogData.push({
      title: faker.lorem.words(),
      content: faker.lorem.sentence(),
      published: faker.datatype.boolean(),
      authorId: faker.helpers.arrayElement(users).id
    });
  }

  await prisma.blog.createMany({
    data: blogData,
  });
};
