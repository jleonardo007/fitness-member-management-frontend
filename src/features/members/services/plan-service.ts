import { api } from '@lib/api-client';
import type { ApiResponse } from '@/types/api';
import type { Plan } from '../types/';

export const planService = {
  async getPlans() {
    const res = await api.get<ApiResponse<Plan[]>>('/plans');
    return res.data;
  },
};
