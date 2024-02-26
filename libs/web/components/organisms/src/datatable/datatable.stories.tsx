import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from './datatable';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  tags: ['autodocs'],
  title: 'Components/Organisms/Datatable',
  argTypes: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Primary: Story = {
  args: {
    data: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 40 },
    ],
    columns: [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
    ],
    meta: {
      meta: {
        totalPage: 1,
        currentPage: 1,
      },
    },
  },
};
