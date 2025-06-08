import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type Variant = 'primary' | 'secondary';
export type Size = 'sm' | 'md' | 'lg';

export interface CTAButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Visual style, default = 'primary' */
  variant?: Variant;
  /** 'sm' | 'md' | 'lg', default = 'md' */
  size?: Size;
  /** Show spinner & disable */
  isLoading?: boolean;
  /** Accessible label when using icon-only content */
  ariaLabel?: string;
  className?: string;
}

const base =
  'cursor-pointer inline-flex items-center justify-center rounded-lg font-semibold transition ' +
  'focus:outline-none focus:ring-2 focus:ring-red-500/50 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none';

const variantMap: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/80 disabled:bg-primary/40',
  secondary: 'bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-600/50',
};

const sizeMap: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4',
  lg: 'h-14 px-6 text-lg',
};

/**
 * Reusable call-to-action button.
 *
 * @example
 * <CTAButton onClick={signUp}>Sign up</CTAButton>
 */
function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  ariaLabel,
  className = '',
  ...rest
}: CTAButtonProps) {
  const activeClasses =
    !disabled && !isLoading ? 'active:opacity-75 active:scale-95' : '';

  const composed = [
    base,
    variantMap[variant],
    sizeMap[size],
    activeClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={composed}
      {...rest}
    >
      {isLoading ? (
        <svg
          aria-hidden="true"
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

export default CTAButton;
