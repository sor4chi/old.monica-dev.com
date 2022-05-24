import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

const timelineData: Prisma.TimelineCreateInput[] = [
  {
    title: "I started my first programming",
    content:
      "I started my first programming language. It was Python. I was very tired to study for the exam. So I started to learn Programming.",
    category: {
      connectOrCreate: {
        where: {
          slug: "self-development",
        },
        create: {
          slug: "self-development",
          name: "Self-Development",
        },
      },
    },
    happenedAt: new Date("2020-03-31"),
  },
  {
    title: "I graduated from the HighSchool of Sapporo",
    content:
      "I graduated from the HighSchool of Sapporo. I was a member of the high school's math club.",
    category: {
      connectOrCreate: {
        where: {
          slug: "school",
        },
        create: {
          slug: "school",
          name: "School",
        },
      },
    },
    happenedAt: new Date("2021-03-09"),
  },
  {
    title: "I started to study at the University of Saitama",
    content:
      "I started to study at the University of Saitama. I was a member of the university's math club.",
    category: {
      connectOrCreate: {
        where: {
          slug: "school",
        },
        create: {
          slug: "school",
          name: "School",
        },
      },
    },
    happenedAt: new Date("2021-04-10"),
  },
];

export const timelineTransfer = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];
  timelineData.forEach((data) => {
    result.push(
      prisma.timeline.create({
        data,
      })
    );
  });
  return await prisma.$transaction(result);
};
