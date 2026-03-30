import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authService } from '@/features/auth/services';
import { AuthContext, type AuthState } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const signin = useCallback(async (email: string, password: string) => {
    const res = await authService.signin({ email, password });
    setState({ user: res.data, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const checkSession = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await authService.me();
      setState({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signin, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};
