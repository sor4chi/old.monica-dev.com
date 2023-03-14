import { StoryFn, Meta } from '@storybook/react';

import { MediaGrid } from './media-grid';

export default {
  title: 'embed/tweet/image-grid',
  component: MediaGrid,
} as Meta<typeof MediaGrid>;

const Template: StoryFn<typeof MediaGrid> = (args) => <MediaGrid {...args} />;

export const One = Template.bind({});
One.args = {
  media_urls: Array.from(
    { length: 1 },
    () => 'https://placehold.jp/320x180.png',
  ),
};

export const Two = Template.bind({});
Two.args = {
  media_urls: Array.from(
    { length: 2 },
    () => 'https://placehold.jp/320x180.png',
  ),
};

export const Three = Template.bind({});
Three.args = {
  media_urls: Array.from(
    { length: 3 },
    () => 'https://placehold.jp/320x180.png',
  ),
};

export const Four = Template.bind({});
Four.args = {
  media_urls: Array.from(
    { length: 4 },
    () => 'https://placehold.jp/320x180.png',
  ),
};
