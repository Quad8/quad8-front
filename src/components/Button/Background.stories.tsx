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

export const GrayBackground: Story = { args: { backgroundColor: 'background-gray-40' } };
export const PrimaryBackground: Story = { args: {} };
export const Primary60Background: Story = { args: { backgroundColor: 'background-primary-60' } };
export const GrayBorder: Story = { args: { backgroundColor: 'outline-gray-40' } };
export const PrimaryBorder: Story = { args: { backgroundColor: 'outline-primary' } };
export const Primary60Border: Story = { args: { backgroundColor: 'outline-primary-60' } };
