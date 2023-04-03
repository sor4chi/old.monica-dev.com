import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '..';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  argTypes: {
    icon: {
      control: {
        type: 'object',
      },
    },
    size: {
      control: {
        options: ['sm', 'md'],
        type: 'select',
      },
    },
    variant: {
      control: {
        options: ['primary', 'secondary'],
        type: 'select',
      },
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Foundation/Button',
} satisfies Meta<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => <Button {...args}> Button </Button>,
};
type Story = StoryObj<typeof Button>;

export const Secondary = {
  args: {
    variant: 'secondary',
  },
  render: (args) => <Button {...args}> Button </Button>,
} satisfies Story;

export const Sizes = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Button {...args}> Small </Button>
      <Button {...args} size="md">
        Medium
      </Button>
    </div>
  ),
} satisfies Story;

export default meta;
