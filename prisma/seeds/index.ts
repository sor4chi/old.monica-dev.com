import { prisma } from "../../lib/prisma";
import { timelineTransfer } from "./timeline";

const main = async () => {
  console.log("Start seeding...");

  await Promise.all([timelineTransfer()]);

  console.log("Seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
