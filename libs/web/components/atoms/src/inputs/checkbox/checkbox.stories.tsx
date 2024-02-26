import type { Meta, StoryObj } from '@storybook/react';

import { InputCheckbox } from './checkbox';

const meta: Meta<typeof InputCheckbox> = {
  component: InputCheckbox,
  tags: ['autodocs'],
  title: 'Components/Atoms/Input Checkbox',
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },

    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputCheckbox>;

export const Primary: Story = {
  args: {
    size: 'sm',
  },
};
