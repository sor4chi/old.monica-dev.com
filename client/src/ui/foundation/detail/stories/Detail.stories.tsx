import type { Meta, StoryObj } from '@storybook/react';

import { Detail } from '..';

const meta = {
  argTypes: {
    summary: {
      control: { type: 'text' },
    },
  },
  component: Detail,
  tags: ['autodocs'],
  title: 'Foundation/Detail',
} satisfies Meta<typeof Detail>;

type Story = StoryObj<typeof Detail>;

export const Default = {
  args: {
    children: (
      <p>
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
      </p>
    ),
    summary: 'Summary',
  },
} as Story;

export default meta;
