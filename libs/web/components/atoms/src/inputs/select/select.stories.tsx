import type { Meta, StoryObj } from '@storybook/react';

import { InputSelect } from './select';

const meta: Meta<typeof InputSelect> = {
  component: InputSelect,
  tags: ['autodocs'],
  title: 'Components/Atoms/Input Select',
  argTypes: {
    status: {
      options: ['default', 'error', 'warning', 'success'],
      defaultValue: 'default',
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      defaultValue: 'sm',
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputSelect>;

export const Primary: Story = {
  args: {},
};
