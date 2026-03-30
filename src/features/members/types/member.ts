import type { IdentificationType, UserRoles } from '@/types/enums';
import type { Membership } from './membership';
import type { CheckIn } from './checkin';

export interface Member {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  identificationType: IdentificationType;
  identificationNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberDetail extends Member {
  memberships: Membership[];
  checkins: CheckIn[];
}

export interface CreateMemberDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  identificationType: IdentificationType;
  identificationNumber: string;
}

export interface GetMembersParams {
  page: number;
  pageSize: number;
}

export interface SearchMembersParams {
  query: string;
}
