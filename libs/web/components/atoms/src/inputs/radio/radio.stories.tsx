import type { Meta, StoryObj } from '@storybook/react';

import { InputRadio } from './radio';

const meta: Meta<typeof InputRadio> = {
  component: InputRadio,
  tags: ['autodocs'],
  title: 'Components/Atoms/Radio',
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
type Story = StoryObj<typeof InputRadio>;

export const Primary: Story = {
  args: {
    size: 'sm',
  },
};
