import { NavLink } from 'react-router';
import { Users, ClipboardList, Dumbbell } from 'lucide-react';
import { ROUTES } from '@router/routes';

type SidebarProps = {
  collapsed: boolean;
};

const navItems = [
  { label: 'Members', icon: Users, to: ROUTES.MEMBERS },
  { label: 'Check-ins', icon: ClipboardList, to: '/checkins' },
];

export const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside
      className={`
        flex flex-col h-full bg-card border-r border-border
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className='flex items-center gap-3 px-4 h-16 border-b border-border'>
        <Dumbbell className='w-6 h-6 text-primary shrink-0' />
        {!collapsed && (
          <span className='font-bold text-lg tracking-tight truncate'>FitManager</span>
        )}
      </div>

      {/* Nav */}
      <nav className='flex flex-col gap-1 p-2 flex-1'>
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
              transition-colors duration-150
              ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <Icon className='w-5 h-5 shrink-0' />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
