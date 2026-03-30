import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = ({ hasError = false, className = '', ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full px-3 py-2 text-sm rounded-md border bg-background text-foreground
        placeholder:text-muted-foreground
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
        ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-border'}
        ${className}
      `}
      {...props}
    />
  );
};
