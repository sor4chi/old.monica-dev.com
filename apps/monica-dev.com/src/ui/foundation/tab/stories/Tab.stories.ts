import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from '..';

const meta = {
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'onChange',
    },
    tabs: {
      control: { type: 'array' },
    },
  },
  component: Tab,
  tags: ['autodocs'],
  title: 'Foundation/Tab',
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof Tab>;

export const Default = {
  args: {
    name: 'tab',
    tabs: [
      { id: '1', label: 'Home' },
      { id: '2', label: 'About' },
      { id: '3', label: 'Contact' },
    ],
  },
} satisfies Story;

export default meta;
