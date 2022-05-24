import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { Timeline } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Timeline[]>
) {
  const timelineData = await prisma.timeline.findMany();

  res.status(200).json(timelineData);
}
