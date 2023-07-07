import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Calendar } from '..';

const meta = {
  argTypes: {},
  component: Calendar,
  decorators: [
    (Story: StoryFn) => {
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);
      return <Story args={{ selectedDate, setSelectedDate }} />;
    },
  ],
  tags: ['autodocs'],
  title: 'Foundation/Calendar',
} satisfies Meta<typeof Calendar>;

type Story = StoryObj<typeof Calendar>;

export const Default = {
  args: {
    children: 'This is a card',
  },
} as Story;

export default meta;
