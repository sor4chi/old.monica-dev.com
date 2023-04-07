import type { Meta, StoryObj } from '@storybook/react';
import { MdThumbUp } from 'react-icons/md';

import { Button } from '..';

import { Table } from './table';

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

type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    children: 'Default',
  },
} satisfies Story;

export const Variant = {
  render: (args) => {
    const header = ['Variant', 'Button'];
    const rows = [
      [
        'Primary',
        <Button {...args} variant="primary" key="primary">
          Submit
        </Button>,
      ],
      [
        'Secondary',
        <Button {...args} variant="secondary" key="secondary">
          Submit
        </Button>,
      ],
    ];

    return <Table header={header} rows={rows} />;
  },
} satisfies Story;

export const Size = {
  render: (args) => {
    const header = ['Size', 'Button'];
    const rows = [
      [
        'Small',
        <Button {...args} size="sm" key="sm">
          Submit
        </Button>,
      ],
      [
        'Medium',
        <Button {...args} size="md" key="md">
          Submit
        </Button>,
      ],
    ];

    return <Table header={header} rows={rows} />;
  },
} satisfies Story;

export const Icon = {
  render: (args) => {
    const header = ['Icon', 'Button'];
    const rows = [
      [
        'With SVG',
        <Button {...args} icon={<MdThumbUp size={20} />} key="icon">
          Submit
        </Button>,
      ],
      [
        'With Emoji',
        <Button {...args} icon="👍" key="emoji">
          Submit
        </Button>,
      ],
    ];

    return <Table header={header} rows={rows} />;
  },
} satisfies Story;

export default meta;
