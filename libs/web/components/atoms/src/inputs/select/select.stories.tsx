import type { Meta, StoryObj } from '@storybook/react';

import { InputSelect } from './select';

const meta: Meta<typeof InputSelect> = {
  component: InputSelect,
  tags: ['autodocs'],
  title: 'Components/Atoms/Select',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InputSelect>;

export const Primary: Story = {
  args: {},
};
