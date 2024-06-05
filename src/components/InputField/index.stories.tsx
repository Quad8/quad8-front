import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = { component: InputField };
export default meta;

type Story = StoryObj<typeof InputField>;

export const Primary: Story = { args: {} };

export const Boky: Story = { args: { size: 'lg', label: 'quad8' } };

export const Dw: Story = { args: { size: 'sm', label: 'quad8' } };
