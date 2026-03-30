import React from 'react';

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

type SheetContentProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const Sheet = ({ open, children }: SheetProps) => {
  if (!open) return null;
  return <div data-testid='sheet'>{children}</div>;
};

export const SheetTrigger = ({ children }: { children: React.ReactNode }) => children;

export const SheetContent = ({ title, description, children }: SheetContentProps) => (
  <div data-testid='sheet-content'>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    {children}
  </div>
);
