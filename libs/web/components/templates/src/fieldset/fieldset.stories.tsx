import type { Meta, StoryObj } from '@storybook/react';

import { Fieldset } from './fieldset';

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ['autodocs'],
  title: 'Components/Molecules/Field Set',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Primary: Story = {
  args: {},
};
