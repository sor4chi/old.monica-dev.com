import { Client } from '@sor4chi/twitter-api-sdk';

if (!process.env.TWITTER_BEARER_TOKEN)
  throw new Error('⚠️SET TWITTER_BEARER_TOKEN TO ENV⚠️');

const client = new Client(process.env.TWITTER_BEARER_TOKEN);

export const fetchTweet = async (id: string) => {
  const res = await client.tweets.findTweetById(id, {
    'tweet.fields': [
      'referenced_tweets',
      'author_id',
      'created_at',
      'public_metrics',
    ],
    expansions: ['author_id', 'attachments.media_keys'],
    'user.fields': ['name', 'username', 'profile_image_url'],
    'media.fields': ['url', 'preview_image_url'],
  });
  return res;
};
