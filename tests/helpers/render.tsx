import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactNode } from 'react';
import { AuthContext } from '../../src/context';
import { mockUser } from '../mocks/fixtures';

const mockAuthValue = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  signin: async () => {},
  logout: async () => {},
  checkSession: async () => {},
};

export const renderWithProviders = (ui: ReactNode, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthContext.Provider value={mockAuthValue}>{ui}</AuthContext.Provider>
    </MemoryRouter>,
  );
};
