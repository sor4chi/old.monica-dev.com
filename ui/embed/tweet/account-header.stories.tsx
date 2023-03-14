import { StoryFn, Meta } from '@storybook/react';

import { AccountHeader } from './account-header';

export default {
  title: 'embed/tweet/account-header',
  component: AccountHeader,
} as Meta<typeof AccountHeader>;

const Template: StoryFn<typeof AccountHeader> = (args) => (
  <AccountHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'Hogekawa Hugamich',
  username: 'hugamich',
  created_at: new Date(2023, 0, 1),
};

export const Quote = Template.bind({});
Quote.args = {
  name: 'Hogekawa Hugamich',
  username: 'hugamich',
  created_at: new Date(2023, 0, 1),
  quote: true,
};
