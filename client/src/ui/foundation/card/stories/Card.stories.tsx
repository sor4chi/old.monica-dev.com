import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '..';

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Foundation/Card',
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default = {
  args: {
    children: 'This is a card',
  },
} as Story;

export default meta;
