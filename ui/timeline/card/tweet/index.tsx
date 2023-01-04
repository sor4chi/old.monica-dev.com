import { use } from 'react';

import { fetchProfile, fetchTweet } from '#/lib/twitter';
import { Profile, Tweet } from '#/types/tweet';

import { AccountHeader } from './account-header';
import { AccountIcon } from './account-icon';
import { Container } from './container';
import { Content } from './content';
import { Impressions } from './impression';

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

interface TweetCardProps {
  profile: Profile;
  tweet: Tweet;
}

export const TweetCard = ({ profile, tweet }: TweetCardProps) => (
  <>
    <AccountIcon
      username={profile.username}
      profile_image_url={profile.profile_image_url}
    />
    <div className="flex flex-col items-start gap-1">
      <AccountHeader
        name={profile.name}
        username={profile.username}
        created_at={tweet.created_at}
      />
      <Content
        text={tweet.text}
        quote_id={
          tweet.referenced_tweets?.length
            ? tweet.referenced_tweets[0].id
            : undefined
        }
      />
      <Impressions
        replyCount={tweet.public_metrics.reply_count}
        retweetCount={
          tweet.public_metrics.retweet_count + tweet.public_metrics.quote_count
        }
        likeCount={tweet.public_metrics.like_count}
      />
    </div>
  </>
);

interface TwitterEmbedProps {
  id: string;
}

export const TwitterEmbed = ({ id }: TwitterEmbedProps) => {
  const { data: tweet } = use(fetchTweetFromId(id));
  const { data: profile } = use(fetchProfileFromId(tweet.author_id));

  return (
    <Container id={id}>
      {tweet && profile && <TweetCard profile={profile} tweet={tweet} />}
    </Container>
  );
};
