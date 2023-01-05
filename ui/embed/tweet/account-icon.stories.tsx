import { StoryFn, Meta } from '@storybook/react';

import { AccountIcon } from './account-icon';

export default {
  title: 'ui/card/tweet/account-icon',
  component: AccountIcon,
} as Meta<typeof AccountIcon>;

const Template: StoryFn<typeof AccountIcon> = (args) => (
  <AccountIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  username: 'hugamich',
  profile_image_url:
    'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
};
