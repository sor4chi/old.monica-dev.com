import { PrismaClient } from '@prisma/client';

import { generateBlogs } from './blog';
import { generateRoles } from './role';
import { generateUsers } from './user';

const prisma = new PrismaClient()

const main = async () => {
  await Promise.all([
    generateRoles(),
    generateUsers(),
  ])
  const users = await prisma.user.findMany()
  await generateBlogs(users)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
