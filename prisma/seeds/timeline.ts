import { faker } from '@faker-js/faker';
import {
  ContentImg,
  ContentLink,
  ContentText,
  ContentTweet,
  Prisma,
  PrismaClient,
  Timeline,
} from '@prisma/client';

import { SEEDER_CONFIG } from './_config';

const generateTimelineContent = (timelineContentType: string) => {
  const contentObj = {
    content: faker.lorem.paragraphs(),
  };

  if (timelineContentType === 'TEXT') {
    return {
      contentText: {
        create: contentObj,
      },
    };
  }
  if (timelineContentType === 'IMAGE') {
    return {
      contentImg: {
        create: {
          ...contentObj,
          img: faker.image.imageUrl(),
        },
      },
    };
  }
  if (timelineContentType === 'LINK') {
    return {
      contentLink: {
        create: {
          ...contentObj,
          link: faker.internet.url(),
        },
      },
    };
  }
  if (timelineContentType === 'TWEET') {
    return {
      contentTweet: {
        create: {
          ...contentObj,
          tweet: faker.internet.url(),
        },
      },
    };
  }
};

export const generateTimeline = async (prisma: PrismaClient) => {
  const timelineData: Prisma.TimelineCreateInput[] = [];
  for (let i = 0; i < SEEDER_CONFIG.TIMELINE_TYPE_LIST.length * 2; i++) {
    const timelineContentType =
      SEEDER_CONFIG.TIMELINE_TYPE_LIST[
        i % SEEDER_CONFIG.TIMELINE_TYPE_LIST.length
      ];
    const timelineQuery: Prisma.TimelineCreateInput = {
      title: faker.lorem.words(),
      contentType: timelineContentType,
    };
    const timelineContent = generateTimelineContent(timelineContentType);
    Object.assign(timelineQuery, timelineContent);
    timelineData.push(timelineQuery);
  }

  const timeline: (Timeline & {
    contentImg: ContentImg | null;
    contentLink: ContentLink | null;
    contentText: ContentText | null;
    contentTweet: ContentTweet | null;
  })[] = [];
  for (const data of timelineData) {
    const res = await prisma.timeline.create({
      data,
      include: {
        contentImg: true,
        contentLink: true,
        contentText: true,
        contentTweet: true,
      },
    });
    timeline.push(res);
  }
  return timeline;
};
