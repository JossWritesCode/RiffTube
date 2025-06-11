import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TextInput, { TextInputProps } from './TextInput';

describe('TextInput', () => {
  function renderTextInput(overrides: Partial<TextInputProps> = {}) {
    const onChange = vi.fn();
    const props: TextInputProps = {
      id: 'email',
      label: 'Email',
      value: '',
      onChange,
      placeholder: 'you@example.com',
      type: 'text',
      required: false,
      ...overrides,
    };
    render(<TextInput {...props} />);
    const input = screen.getByLabelText(/email/i) as HTMLInputElement;
    return { input, props };
  }

  test('renders an accessible input with associated label', () => {
    const { input } = renderTextInput();

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toBeInTheDocument();
  });

  test('supports the `type` prop', () => {
    const { input } = renderTextInput({ type: 'password' });
    expect(input).toHaveAttribute('type', 'password');
  });

  test('renders placeholder text', () => {
    const placeholder = 'Enter your email';
    const { input } = renderTextInput({ placeholder });
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  test('calls `onChange` prop when typing', async () => {
    const { input, props } = renderTextInput();
    await userEvent.type(input, 'abc');
    expect(props.onChange).toHaveBeenCalledTimes(3);
    // Optionally verify the event target
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: input }),
    );
  });

  test('shows infoMessage when focused and no error', () => {
    const message = 'All good!';
    const { input } = renderTextInput({ value: 'ok', infoMessage: message });
    fireEvent.focus(input);
    expect(screen.getByText(message)).toBeVisible();
  });

  test('hides infoMessage after blur', () => {
    const message = 'Hint text';
    const { input } = renderTextInput({ infoMessage: message });
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(screen.queryByText(message)).toBeNull();
  });

  test('renders asterisk on label and required attribute on input when required', () => {
    const { input } = renderTextInput({ required: true });
    expect(screen.getByText(/Email\s*\*/)).toBeInTheDocument();
    expect(input).toBeRequired();
  });

  test('shows custom errorMessage on blur when required and empty', () => {
    const errorMessage = 'Required field';
    const { input } = renderTextInput({ required: true, errorMessage });
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(screen.getByText(errorMessage)).toBeVisible();
  });

  test('shows default invalid message when pattern mismatch occurs', () => {
    const { input } = renderTextInput({ pattern: '\\d+', value: 'abc' });
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(screen.getByText('Invalid value')).toBeVisible();
  });
});
