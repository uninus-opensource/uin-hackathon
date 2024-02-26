import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from './data-table';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  tags: ['autodocs'],
  title: 'Components/Atoms/Input Text',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Primary: Story = {
  args: {},
};
