import type { Meta, StoryObj } from '@storybook/react';
import RadioField from './RadioField';

const meta: Meta<typeof RadioField> = { component: RadioField };
export default meta;

type Story = StoryObj<typeof RadioField>;

export const Primary: Story = { args: { options: ['남자', '여자'], label: '성별' } };
