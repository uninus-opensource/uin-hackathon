import type { Meta, StoryObj } from '@storybook/react';

import { LineChart } from './index';

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  tags: ['autodocs'],
  title: 'Components/Atoms/Line Chart',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Primary: Story = {
  args: {
    title: 'Data Randa Indonesia',
  },
};
