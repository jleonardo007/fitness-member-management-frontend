import { useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks';
import { MainLayoutSkeleton } from '@/components/main-layout-skeleton';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading, checkSession } = useAuth();

  useLayoutEffect(() => {
    checkSession();
  }, [checkSession]);

  if (isLoading) return <MainLayoutSkeleton />;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
};
