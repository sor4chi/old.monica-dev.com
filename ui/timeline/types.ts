import {
  ContentImg,
  ContentLink,
  ContentText,
  ContentTweet,
  Timeline,
} from '@prisma/client';

import { StringDate } from '#/types/utility';

export type TimelineProps = StringDate<Timeline> & {
  contentImg: ContentImg | null;
  contentText: ContentText | null;
  contentTweet: ContentTweet | null;
  contentLink: ContentLink | null;
};
