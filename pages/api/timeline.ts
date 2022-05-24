import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { Timeline, TimelineCategory } from "@prisma/client";
import type { ErrorResponse } from "types/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | (Timeline & {
        category: TimelineCategory;
      })[]
    | ErrorResponse
  >
) {
  const { page, perPage } = req.query;
  if (!Number(page) || !Number(perPage)) {
    res.status(400).json({
      error: "page and perPage must be numbers",
    });
    return;
  }

  const timelineData = await prisma.timeline.findMany({
    orderBy: {
      happenedAt: "desc",
    },
    include: {
      category: true,
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });

  res.status(200).json(timelineData);
}
