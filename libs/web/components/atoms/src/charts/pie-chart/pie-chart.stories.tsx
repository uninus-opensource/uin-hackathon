import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './index';

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  tags: ['autodocs'],
  title: 'Components/Atoms/Pie Chart',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Primary: Story = {
  args: {
    title: 'Data Randa Indonesia',
  },
};
