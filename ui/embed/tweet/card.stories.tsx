import { StoryFn, Meta } from '@storybook/react';

import { Media, Profile, Tweet } from '#/types/tweet';

import { TweetCard } from './card';

export default {
  title: 'embed/tweet/card',
  component: TweetCard,
} as Meta<typeof TweetCard>;

const Template: StoryFn<typeof TweetCard> = (args) => <TweetCard {...args} />;

export const Default = Template.bind({});

const profile: Profile = {
  id: '1',
  name: 'Hogekawa Hugamich',
  username: 'hugamich',
  profile_image_url:
    'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
};

const tweet: Tweet = {
  id: '1',
  text: 'Hello, world!',
  created_at: new Date(2023, 0, 1).toISOString(),
  public_metrics: {
    reply_count: 1,
    retweet_count: 2,
    like_count: 3,
    quote_count: 4,
  },
  author_id: 'hugamich',
  referenced_tweets: [],
};

const media: Media[] = Array.from({ length: 4 }, () => ({
  type: '',
  url: 'https://placehold.jp/320x180.png',
  media_key: '',
}));

Default.args = {
  profile,
  tweet,
  media: [],
};

export const WithMedia = Template.bind({});
WithMedia.args = {
  profile,
  tweet,
  media,
};
