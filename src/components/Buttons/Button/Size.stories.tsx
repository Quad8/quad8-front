import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'button',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: {} };
export const Xsmall: Story = { args: { width: 72, fontSize: 14, paddingVertical: 8 } };
export const Small: Story = { args: { width: 90, fontSize: 14, paddingVertical: 8 } };
export const Medium: Story = { args: { width: 120, fontSize: 18, paddingVertical: 8 } };
export const Large: Story = { args: { width: 154, fontSize: 20, paddingVertical: 20 } };
export const XLarge: Story = { args: { width: 320, fontSize: 24, paddingVertical: 20 } };
