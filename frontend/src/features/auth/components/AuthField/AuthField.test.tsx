import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import AuthField from './AuthField';

describe('AuthField', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
    value: 'initial',
    onChange: vi.fn(),
    placeholder: 'Enter text',
    type: 'text' as const,
    required: false,
    pattern: '',
  };

  it('renders TextInput with correct label, value, and placeholder', () => {
    render(<AuthField {...defaultProps} />);
    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('initial');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toBeRequired();
  });

  it('calls onChange when the input value changes', () => {
    const onChange = vi.fn();
    render(<AuthField {...defaultProps} onChange={onChange} />);
    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders error message when error prop is provided', () => {
    const error = { type: 'manual', message: 'My error' };
    render(<AuthField {...defaultProps} error={error} />);
    expect(screen.getByText('My error')).toBeVisible();
  });

  it('does not render error message when error prop is undefined', () => {
    render(<AuthField {...defaultProps} error={undefined} />);
    expect(screen.queryByText('My error')).toBeNull();
  });
});
