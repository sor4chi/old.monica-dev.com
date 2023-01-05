import { use } from 'react';

import { fetchProfile, fetchTweet } from '#/lib/twitter';

const fetchTweetFromId = async (id: string) => {
  const res = await fetchTweet({ id });
  if (!res) throw new Error(`Failed to fetch tweet from id:${id}`);
  return res;
};

const fetchProfileFromId = async (id: string) => {
  const res = await fetchProfile({ id });
  if (!res) throw new Error(`Failed to fetch profile from id:${id}`);
  return res;
};

export const useEmbedTweet = (id: string) => {
  const { data: tweet } = use(fetchTweetFromId(id));
  const { data: profile } = use(fetchProfileFromId(tweet.author_id));

  return {
    tweet,
    profile,
  };
};
