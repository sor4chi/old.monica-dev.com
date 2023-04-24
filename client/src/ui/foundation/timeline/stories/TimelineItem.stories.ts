import type { Meta, StoryObj } from '@storybook/react';

import { TimelineItem } from '..';

const meta = {
  argTypes: {
    additional: {
      control: { type: 'text' },
    },
    blog: {
      control: { type: 'text' },
    },
    category: {
      control: { type: 'text' },
    },
    date: {
      control: { type: 'text' },
    },
    link: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
  },
  component: TimelineItem,
  tags: ['autodocs'],
  title: 'Foundation/Timeline/Item',
} satisfies Meta<typeof TimelineItem>;

type Story = StoryObj<typeof TimelineItem>;

const baseArgs = {
  blog: {
    slug: 'blog-title',
    title: 'これは技術ブログのタイトルです',
  },
  date: '2021-01-01',
  title: 'Timeline Item Title',
};

export const Default = {
  args: {
    ...baseArgs,
    category: 'Category',
  },
} satisfies Story;

export const Work = {
  args: {
    ...baseArgs,
    category: 'work',
  },
} satisfies Story;

export const Education = {
  args: {
    ...baseArgs,
    category: 'education',
  },
} satisfies Story;

export const Blog = {
  args: {
    ...baseArgs,
    additional: 'monica-dev.com',
    category: 'blog',
    link: 'https://monica-dev.com',
  },
} satisfies Story;

export const Product = {
  args: {
    ...baseArgs,
    additional: 'pazcal.net',
    category: 'product',
  },
} satisfies Story;

export const Award = {
  args: {
    ...baseArgs,
    additional: 'Web Speed Hackathon 2023',
    category: 'award',
  },
} satisfies Story;

export const BlogOptional = {
  args: {
    ...baseArgs,
    blog: undefined,
    category: 'blog',
  },
} satisfies Story;

export default meta;
