import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks';
import { Button } from '@components/ui';

type HeaderProps = {
  onToggleSidebar: () => void;
};

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className='flex items-center justify-between h-16 px-6 border-b border-border bg-card shrink-0'>
      <Button variant='ghost' size='sm' onClick={onToggleSidebar} aria-label='Toggle sidebar'>
        <Menu className='w-5 h-5' />
      </Button>

      <div className='flex items-center gap-4'>
        {user && (
          <span className='text-sm text-muted-foreground'>
            {user.firstName} {user.lastName}
          </span>
        )}
        <Button variant='ghost' size='sm' onClick={logout} aria-label='Logout'>
          <LogOut className='w-4 h-4' />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};
