import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TextInput, { TextInputProps } from './TextInput';

const renderTextInput = (overrides: Partial<TextInputProps> = {}) => {
  const props: TextInputProps = {
    id: 'email',
    label: 'Email',
    value: '',
    onChange: () => void 0,
    placeholder: 'you@example.com',
    ...overrides,
  };
  render(<TextInput {...props} />);
  return props;
};

it('sets the <input> type attribute from the `type` prop', () => {
  renderTextInput({ type: 'password' });
  const input = screen.getByLabelText(/email/i);
  expect(input).toHaveAttribute('type', 'password');
});

it('fires `onChange` when typing', async () => {
  const onChange = vi.fn();
  renderTextInput({ onChange });
  const input = screen.getByLabelText(/email/i);
  await userEvent.type(input, 'a');
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('shows info helper while focused and valid', () => {
  renderTextInput({ value: 'ok', infoMessage: '✓' });
  const input = screen.getByLabelText(/email/i);
  fireEvent.focus(input);
  expect(screen.getByText('✓')).toBeVisible();
});

it('shows error on blur when required and empty', () => {
  renderTextInput({ required: true, errorMessage: 'Required' });
  const input = screen.getByLabelText(/email/i);
  fireEvent.focus(input);
  fireEvent.blur(input);
  expect(screen.getByText('Required')).toBeVisible();
});
