import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ROLE_LIST = ["ADMIN", "USER"] as const;

export const generateRoles = async () => {
  const roleData: Prisma.UserRoleCreateInput[] = [];
  roleData.push(...ROLE_LIST.map((role) => ({ role })));
  await prisma.userRole.createMany({
    data: roleData,
  });
}