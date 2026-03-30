import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='flex h-screen bg-background text-foreground'>
      <Sidebar collapsed={collapsed} />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Header onToggleSidebar={() => setCollapsed((prev) => !prev)} />
        <main className='flex-1 overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
