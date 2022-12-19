import {
  Timeline,
  ContentText,
  ContentTweet,
  ContentImg,
  ContentLink,
} from '@prisma/client';

import { TIMELINE_KINDS } from '#/constants/timeline';
import { StringDate } from '#/types/utility';

type TextContent = {
  type: typeof TIMELINE_KINDS.TEXT;
} & ContentText;
type TweetContent = {
  type: typeof TIMELINE_KINDS.TWEET;
} & ContentTweet;
type ImageContent = {
  type: typeof TIMELINE_KINDS.IMAGE;
} & ContentImg;
type LinkContent = {
  type: typeof TIMELINE_KINDS.LINK;
} & ContentLink;

export type TimelineContent =
  | TextContent
  | TweetContent
  | ImageContent
  | LinkContent;

export type TimelineProps = StringDate<Timeline> & {
  content?: TimelineContent;
};
