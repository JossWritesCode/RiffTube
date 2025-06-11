import { FieldError } from 'react-hook-form';
import TextInput, { TextInputProps } from '@/components/TextInput';

type AuthFieldProps = Pick<
  TextInputProps,
  'id' | 'value' | 'onChange' | 'placeholder' | 'type' | 'required' | 'pattern'
> & {
  /** Visible label for the input */
  label: string;
  /** Field error from React Hook Form (if any) */
  error?: FieldError;
};

function AuthField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type,
  required,
  pattern,
  error,
}: AuthFieldProps) {
  return (
    <div className="mb-4">
      <TextInput
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        pattern={pattern}
        errorMessage={error?.message}
      />
    </div>
  );
}

export default AuthField;
