import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Organisms/Modal',
  argTypes: {
    isOpen: {
      control: {
        type: "boolean",
      },
    },

    width: {
      control: {
        type: "text",
      },
      defaultValue: "400px",
    },

    height: {
      control: {
        type: "text",
      },
      defaultValue: "400px",
    },

    onClose: {
      action: "onClose",
    },
  },
 
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
   title: 'Randa Slayer',
   isOpen: false,
   onClose: () => console.log("close"),
   children: <div>HELLO THIS IS MY MODAL</div>,
   width: "600px",
   height: "400px",
  },
};
