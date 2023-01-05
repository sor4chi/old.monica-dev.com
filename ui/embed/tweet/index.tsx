import { fetchProfile, fetchTweet } from '#/lib/twitter';
import { useEmbedTweet } from '#/ui/embed/tweet/use-embed-tweet';

import { TweetCard } from './card';

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

interface Props {
  id: string;
  quote?: boolean;
}

export const TweetEmbed = ({ id, quote }: Props) => {
  const { tweet, profile } = useEmbedTweet(id);

  return (
    <div className="common-card my-4 flex w-full max-w-lg cursor-pointer items-start gap-2 p-4">
      {tweet && profile && (
        <TweetCard profile={profile} tweet={tweet} quote={quote} />
      )}
    </div>
  );
};
