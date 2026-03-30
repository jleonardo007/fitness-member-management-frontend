import { api } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';
import type { Membership, AssignMembershipDto, CancelMembershipDto } from '../types/membership';

export const membershipService = {
  async assignMembership(dto: AssignMembershipDto) {
    const res = await api.post<ApiResponse<Membership>>('/assign-membership', dto);
    return res.data;
  },

  async cancelMembership(dto: CancelMembershipDto) {
    const res = await api.post<ApiResponse<Membership>>('/cancel-membership', dto);
    return res.data;
  },
};
