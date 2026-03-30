import type { ReactNode, FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

export const Form = ({ children, className = '', ...props }: FormProps) => {
  return (
    <form className={`flex flex-col gap-4 ${className}`} {...props}>
      {children}
    </form>
  );
};
