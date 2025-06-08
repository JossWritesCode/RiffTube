import { useState, useRef } from 'react';

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
        className="
          absolute top-2 left-4
          text-xs font-medium
          text-silver-dust
          pointer-events-none
        "
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
        className="
          peer
          block w-full
          pt-6 pb-3 px-4
          rounded-2xl
          bg-transparent
          text-white
          placeholder-gray-600
          border-2 border-smoke
          focus:outline-none
          focus:ring-4 focus:ring-silver-dust/50
          focus:border-silver-dust
          invalid:focus:border-red-500
          invalid:focus:ring-red-500/50
          transition
        "
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
