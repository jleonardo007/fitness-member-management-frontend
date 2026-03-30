import { api } from '@lib/api-client';
import type { ApiResponse, User } from '@/types';
import type { SigninDto } from '../types';

export const authService = {
  async signin(dto: SigninDto) {
    const res = await api.post<ApiResponse<User>>('/sign-in', dto);
    return res.data;
  },

  async logout() {
    await api.post('/logout');
  },

  async me() {
    const res = await api.get<ApiResponse<User>>('/me');
    return res.data;
  },
};
