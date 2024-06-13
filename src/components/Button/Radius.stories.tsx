import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'button',
    width: 120,
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const GrayBackground: Story = { args: { radius: 4 } };
export const PrimaryBackground: Story = { args: { radius: 8 } };
