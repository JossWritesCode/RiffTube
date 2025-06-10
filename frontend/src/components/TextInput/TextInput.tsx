import { useRef, useState } from 'react';

export type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
  infoMessage?: string;
};

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  pattern,
  errorMessage = 'Invalid value',
  infoMessage = 'Looks good!',
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInvalid = inputRef.current ? !inputRef.current.validity.valid : false;
  const showError = isInvalid;
  const showInfo = isFocused && !isInvalid;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-silver-dust"
      >
        {label}
        {required && ' *'}
      </label>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer block w-full rounded-2xl border-2 border-smoke bg-transparent px-4 pt-6 pb-3 text-white placeholder-gray-600 transition focus:border-silver-dust focus:ring-4 focus:ring-silver-dust/50 focus:outline-none invalid:focus:border-red-500 invalid:focus:ring-red-500/50"
      />
      <div className="mt-2 ml-1 h-5">
        {showError && <p className="text-xs text-red-500">{errorMessage}</p>}
        {showInfo && !showError && (
          <p className="text-xs text-white">{infoMessage}</p>
        )}
      </div>
    </div>
  );
}

export default TextInput;
