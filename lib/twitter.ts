import { GetProfileResponse, GetTweetResponse } from '#/types/tweet';

interface GetTweetOptions {
  id: string;
  url: string;
}

export const fetchTweet = async ({ id }: Partial<GetTweetOptions>) => {
  const tweetId = id;
  if (!tweetId) return null;
  const params = new URLSearchParams({
    'tweet.fields': [
      'referenced_tweets',
      'author_id',
      'created_at',
      'public_metrics',
    ].join(','),
  });
  const reqUrl = `https://api.twitter.com/2/tweets/${tweetId}?${params.toString()}`;
  const res = await fetch(reqUrl, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
    cache: 'force-cache',
  });
  const json: GetTweetResponse = await res.json();
  return json;
};

interface GetProfileOptions {
  id: string;
}

export const fetchProfile = async ({ id }: Partial<GetProfileOptions>) => {
  if (!id) return null;
  const userId = id;
  const params = new URLSearchParams({
    'user.fields': ['profile_image_url'].join(','),
  });
  const res = await fetch(
    `https://api.twitter.com/2/users/${userId}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      cache: 'force-cache',
    },
  );
  const json: GetProfileResponse = await res.json();
  return json;
};
