import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = { component: Dropdown };
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = { args: { options: ['0', '1', '2'] } };

export const Xsmall: Story = { args: { sizeVariant: 'xs', options: ['0', '1', '2', '직접 입력'] } };

export const Small: Story = { args: { sizeVariant: 'sm', options: ['0', '1', '2'] } };

export const Medium: Story = { args: { sizeVariant: 'md', options: ['0', '1', '2'] } };

export const Large: Story = { args: { sizeVariant: 'lg', options: ['0', '1', '2'] } };
