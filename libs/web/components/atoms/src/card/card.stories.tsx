import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Atoms/Card',
  argTypes: {
    iconColor: {
        options: ['primary', 'error', 'warning', 'success', 'info'],
        control: { type: 'radio' },
      },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    iconColor: 'primary',
    title: 'Disetujui (Prodi)',
    total: '100',
  },
};