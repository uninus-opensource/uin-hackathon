import type { Meta, StoryObj } from '@storybook/react';

import { SnackBar } from './snackbar';

const meta: Meta<typeof SnackBar> = {
  component: SnackBar,
  tags: ['autodocs'],
  title: 'Components/Atoms/SnackBar',
  argTypes: {
    type: {
      options: [ 'error', 'warning', 'success', 'info'],
      control: { type: 'radio' },
    },
 
    position: {
      options: ['topLeft', 'topCenter',"topRight","bottomRight","bottomCenter","bottomLeft"],
      defaultValue: 'topCenter',
      control: { type: 'radio' },
    },
   
  },
};

export default meta;
type Story = StoryObj<typeof SnackBar>;

export const Primary: Story = {
  args: {
    position: 'topRight',
    type: 'success',
    duration: 3000,
    message: 'This is a Response message',
    show: true,
  },
};



