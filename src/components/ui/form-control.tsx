import type { ReactNode } from 'react';
import { Label } from './label';
import { ErrorMessage } from './error-message';

type FormControlProps = {
  label: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
};

export const FormControl = ({ label, error, required, htmlFor, children }: FormControlProps) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      <ErrorMessage message={error} />
    </div>
  );
};
