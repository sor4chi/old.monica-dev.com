import { z } from 'zod';

import { fetchTweet } from '#/lib/twitter';

import { TweetCard } from './card';

interface Props {
  id: string;
  quote?: boolean;
}

const schema = z.object({
  data: z.object({
    id: z.string(),
    text: z.string(),
    created_at: z.string(),
    author_id: z.string(),
    referenced_tweets: z.optional(
      z.array(z.object({ id: z.string(), type: z.string() })),
    ),
    public_metrics: z.object({
      retweet_count: z.number(),
      reply_count: z.number(),
      like_count: z.number(),
      quote_count: z.number(),
      impression_count: z.number(),
    }),
    edit_history_tweet_ids: z.array(z.string()),
  }),
  includes: z.object({
    users: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        profile_image_url: z.string(),
      }),
    ),
    media: z.array(
      z.object({
        type: z.string(),
        url: z.optional(z.string()),
        preview_image_url: z.optional(z.string()),
        media_key: z.string(),
      }),
    ),
  }),
});

export async function TweetEmbed({ id, quote }: Props) {
  const res = await fetchTweet(id).then((res) => schema.parse(res));
  const profile = res.includes.users[0];
  const media = res.includes.media;
  const tweet = res.data;

  return (
    <TweetCard profile={profile} tweet={tweet} media={media} quote={quote} />
  );
}
