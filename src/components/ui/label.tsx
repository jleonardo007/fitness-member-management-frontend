import * as RadixLabel from '@radix-ui/react-label';

type LabelProps = RadixLabel.LabelProps & {
  required?: boolean;
};

export const Label = ({ children, required, className = '', ...props }: LabelProps) => {
  return (
    <RadixLabel.Root className={`text-sm font-medium text-foreground ${className}`} {...props}>
      {children}
      {required && <span className='text-red-500 ml-1'>*</span>}
    </RadixLabel.Root>
  );
};
