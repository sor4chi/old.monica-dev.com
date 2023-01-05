import { Profile, Tweet } from '#/types/tweet';
import { dateTimeToRichDisplay } from '#/utils/date';

import { AccountHeader } from './account-header';
import { AccountIcon } from './account-icon';
import { Impressions } from './impression';
import { PostContent } from './post-content';

interface TweetCardProps {
  profile: Profile;
  tweet: Tweet;
  quote?: boolean;
}

export const TweetCard = ({ profile, tweet, quote }: TweetCardProps) => (
  <>
    <AccountIcon
      username={profile.username}
      profile_image_url={profile.profile_image_url}
    />
    <div className="flex flex-1 flex-col items-start gap-1">
      <AccountHeader
        name={profile.name}
        username={profile.username}
        created_at={new Date(tweet.created_at)}
        vertical={!quote}
      />
      <PostContent
        text={tweet.text}
        quote_id={
          tweet.referenced_tweets?.length
            ? tweet.referenced_tweets[0].id
            : undefined
        }
      />
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        {!quote && dateTimeToRichDisplay(tweet.created_at)}
      </span>
      {!quote && (
        <Impressions
          replyCount={tweet.public_metrics.reply_count}
          retweetCount={
            tweet.public_metrics.retweet_count +
            tweet.public_metrics.quote_count
          }
          likeCount={tweet.public_metrics.like_count}
        />
      )}
    </div>
  </>
);
