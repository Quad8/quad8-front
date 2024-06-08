import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = { component: InputField };
export default meta;

type Story = StoryObj<typeof InputField>;

export const Primary: Story = { args: {} };

export const Small: Story = { args: { sizeVariant: 'sm', label: 'Small' } };

export const Medium: Story = { args: { sizeVariant: 'md', label: 'Medium' } };

export const Large: Story = { args: { sizeVariant: 'lg', label: 'Large' } };

export const Header: Story = { args: { sizeVariant: 'sm', type: 'search', suffixIcon: 'search' } };

export const Password: Story = { args: { label: 'Password', type: 'password', suffixIcon: 'eye' } };

export const Error: Story = { args: { label: 'Error', errorMessage: 'error message' } };

export const Disabled: Story = { args: { label: 'Disabled', value: '010', disabled: true } };
