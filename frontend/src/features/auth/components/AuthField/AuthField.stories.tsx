import type { Meta, StoryObj } from '@storybook/react';
import AuthField from './AuthField';

const meta: Meta<typeof AuthField> = {
  title: 'Auth/AuthField',
  component: AuthField,
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'text' },
    required: { control: 'boolean' },
    pattern: { control: 'text' },
    onChange: { action: 'changed' },
    error: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof AuthField>;

export const Default: Story = {
  args: {
    id: 'email',
    label: 'Email Address',
    value: '',
    onChange: () => {},
    placeholder: 'you@example.com',
    required: false,
    pattern: '',
    error: undefined,
  },
};

export const Required: Story = {
  args: {
    id: 'username',
    label: 'Username',
    value: '',
    onChange: () => {},
    placeholder: 'john_doe',
    required: true,
    pattern: '',
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    id: 'password',
    label: 'Password',
    value: 'short',
    onChange: () => {},
    placeholder: '••••••••',
    required: true,
    pattern: '.{8,}',
    error: {
      type: 'manual',
      message: 'Password must be at least 8 characters',
    },
  },
};
