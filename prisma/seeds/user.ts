import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

import { ROLE_LIST } from "./role";

const prisma = new PrismaClient();
export const USER_LENGTH = 10;

export const generateUsers = async () => {
  const userData: Prisma.UserCreateManyInput[] = [];
  for (let i = 0; i < USER_LENGTH; i++) {
    userData.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      roleId: ROLE_LIST.findIndex((role) => role === "ADMIN") + 1,
    });
  }
  await prisma.user.createMany({
    data: userData,
  });
}