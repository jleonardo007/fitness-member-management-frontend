import { Dumbbell } from 'lucide-react';
import { SigninForm } from '@features/auth/components';

export const AuthPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='w-full max-w-sm'>
        {/* Logo */}
        <div className='flex flex-col items-center gap-2 mb-8'>
          <div className='p-3 rounded-xl bg-primary'>
            <Dumbbell className='w-7 h-7 text-primary-foreground' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>FitManager</h1>
          <p className='text-sm text-muted-foreground'>Sign in to your account</p>
        </div>

        {/* Card */}
        <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
          <SigninForm />
        </div>
      </div>
    </div>
  );
};
