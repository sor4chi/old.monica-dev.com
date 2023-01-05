import clsx from 'clsx';
import { ReactNode, use } from 'react';

import { fetchProfile, fetchTweet } from '#/lib/twitter';

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

interface TwitterEmbedWrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: TwitterEmbedWrapperProps) => (
  <div
    className={clsx(
      'flex w-full items-center justify-center rounded-md',
      'bg-slate-100 dark:bg-neutral-900',
      'transition-colors duration-300',
    )}
  >
    {children}
  </div>
);

interface TwitterEmbedProps {
  id: string;
  quote?: boolean;
}

export const TwitterEmbed = ({ id, quote }: TwitterEmbedProps) => {
  const { data: tweet } = use(fetchTweetFromId(id));
  const { data: profile } = use(fetchProfileFromId(tweet.author_id));

  const Card = (
    <div className="common-card my-4 flex w-full max-w-lg cursor-pointer items-start gap-2 p-4">
      {tweet && profile && (
        <TweetCard profile={profile} tweet={tweet} quote={quote} />
      )}
    </div>
  );

  if (quote) return Card;

  return <Wrapper>{Card}</Wrapper>;
};
