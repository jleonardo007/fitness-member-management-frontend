import { api } from '@lib/api-client';
import type { ApiPaginatedResponse, ApiResponse } from '@/types/api';
import type {
  Member,
  MemberDetail,
  CreateMemberDto,
  GetMembersParams,
  SearchMembersParams,
} from '../types/member';

export const memberService = {
  async getMembers(params: GetMembersParams) {
    const res = await api.get<ApiPaginatedResponse<Member>>('/members', { params });
    return res.data;
  },

  async getMemberById(id: string) {
    const res = await api.get<ApiResponse<MemberDetail>>(`/members/${id}`);
    return res.data;
  },

  async searchMembers(params: SearchMembersParams) {
    const res = await api.get<ApiResponse<Member[]>>('/members/search', { params });
    return res.data;
  },

  async createMember(dto: CreateMemberDto) {
    const res = await api.post<ApiResponse<Member>>('/create-member', dto);
    return res.data;
  },
};
