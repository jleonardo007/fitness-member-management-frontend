import { Skeleton } from '@components/ui';

export const MainLayoutSkeleton = () => {
  return (
    <div className='flex h-screen bg-background'>
      {/* Sidebar skeleton */}
      <div className='w-64 border-r border-border p-4 flex flex-col gap-4'>
        <Skeleton className='h-8 w-32' />
        <div className='flex flex-col gap-2 mt-4'>
          <Skeleton className='h-9 w-full' />
          <Skeleton className='h-9 w-full' />
        </div>
      </div>

      {/* Main skeleton */}
      <div className='flex flex-col flex-1'>
        {/* Header skeleton */}
        <div className='h-16 border-b border-border px-6 flex items-center justify-between'>
          <Skeleton className='h-6 w-6' />
          <Skeleton className='h-8 w-24' />
        </div>

        {/* Content skeleton */}
        <div className='p-6 flex flex-col gap-4'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-64 w-full' />
        </div>
      </div>
    </div>
  );
};
