import { StoryFn, Meta } from '@storybook/react';

import { Impressions } from './impression';

export default {
  title: 'ui/card/tweet/impression',
  component: Impressions,
} as Meta<typeof Impressions>;

const Template: StoryFn<typeof Impressions> = (args) => (
  <Impressions {...args} />
);

export const Default = Template.bind({});
Default.args = {
  replyCount: 1,
  retweetCount: 2,
  likeCount: 3,
};
