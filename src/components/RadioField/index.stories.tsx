import { GENDER_OPTION } from '@/constants/dropdownOptions';
import type { Meta, StoryObj } from '@storybook/react';
import RadioField from './RadioField';

const meta: Meta<typeof RadioField> = { component: RadioField };
export default meta;

type Story = StoryObj<typeof RadioField>;

export const Primary: Story = { args: { options: GENDER_OPTION, label: '성별' } };
