import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

type SheetContentProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export const SheetTrigger = () => <Dialog.Trigger />;

export const SheetContent = ({ title, description, children }: SheetContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/40 z-40 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out' />
      <Dialog.Content
        className='
          fixed top-0 right-0 h-full w-full max-w-lg z-50
          bg-card border-l border-border shadow-xl
          flex flex-col
          data-[state=open]:animate-slide-in-right
          data-[state=closed]:animate-slide-out-right
        '
      >
        {/* Header */}
        <div className='flex items-start justify-between px-6 py-4 border-b border-border shrink-0'>
          <div>
            <Dialog.Title className='text-lg font-semibold text-foreground'>{title}</Dialog.Title>
            {description && (
              <Dialog.Description className='text-sm text-muted-foreground mt-0.5'>
                {description}
              </Dialog.Description>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              className='p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
              aria-label='Close'
            >
              <X className='w-4 h-4' />
            </button>
          </Dialog.Close>
        </div>

        {/* Body */}
        <div className='flex-1 overflow-y-auto px-6 py-4'>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
