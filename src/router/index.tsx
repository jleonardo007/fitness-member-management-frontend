import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from './routes';
import { PrivateRoute } from './private-route';
import { MainLayout } from '@/layouts/main-layout';
import { AuthPage, MembersPage, CheckInsPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <AuthPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Navigate to={ROUTES.MEMBERS} replace /> },
          { path: ROUTES.MEMBERS, element: <MembersPage /> },
          { path: ROUTES.CHECKINS, element: <CheckInsPage /> },
        ],
      },
    ],
  },
]);
