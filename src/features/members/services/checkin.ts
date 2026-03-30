import { api } from '@lib/api-client';
import type { ApiResponse, ApiPaginatedResponse } from '@/types/api';
import type { CheckIn, PlaceCheckInDto } from '../types/checkin';

export const checkInService = {
  async getCheckIns(page: number, pageSize: number) {
    const res = await api.get<ApiPaginatedResponse<CheckIn>>('/checkins', {
      params: { page, pageSize },
    });
    return res.data;
  },

  async placeCheckIn(dto: PlaceCheckInDto) {
    const res = await api.post<ApiResponse<CheckIn>>('/check-in', dto);
    return res.data;
  },
};
