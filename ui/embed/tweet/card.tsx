import Link from 'next/link';

import { Profile, Tweet, Media } from '#/types/tweet';
import { dateTimeToRichDisplay } from '#/utils/date';

import { AccountHeader } from './account-header';
import { AccountIcon } from './account-icon';
import { Impressions } from './impression';
import { PostContent } from './post-content';

interface TweetCardProps {
  profile: Profile;
  tweet: Tweet;
  media: Media[];
  quote?: boolean;
}

export const TweetCard = ({ profile, tweet, media, quote }: TweetCardProps) => (
  <div className="common-card relative my-4 flex w-full max-w-lg items-start gap-2 p-4">
    {!quote && <Link href={''} aria-label="jump-to-tweet" />}
    <AccountIcon
      username={profile.username}
      profile_image_url={profile.profile_image_url}
    />
    <div className="flex flex-1 flex-col items-start gap-1">
      <AccountHeader
        name={profile.name}
        username={profile.username}
        created_at={new Date(tweet.created_at || '')}
        quote={quote}
        id={tweet.id}
      />
      <PostContent
        text={tweet.text}
        media_urls={media
          .map((m) => m.url || m.preview_image_url)
          .filter((m): m is string => !!m)}
        quote_id={
          tweet.referenced_tweets?.length
            ? tweet.referenced_tweets[0].id
            : undefined
        }
      />
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        {!quote && dateTimeToRichDisplay(tweet.created_at || '')}
      </span>
      {!quote && (
        <Impressions
          impressionCount={tweet.public_metrics?.impression_count || 0}
          replyCount={tweet.public_metrics?.reply_count || 0}
          retweetCount={
            (tweet.public_metrics?.retweet_count || 0) +
            (tweet.public_metrics?.quote_count || 0)
          }
          likeCount={tweet.public_metrics?.like_count || 0}
        />
      )}
    </div>
  </div>
);
