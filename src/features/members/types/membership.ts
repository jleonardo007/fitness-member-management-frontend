import type { MembershipStatus, MembershipDuration } from '@/types/enums';
import type { Plan } from './plan';

export interface Membership {
  id: string;
  status: MembershipStatus;
  startDate: string;
  renovateAt: string;
  cancelDate: string | null;
  cancelReason: string;
  memberId: string;
  planId: string;
  assignedById: string | null;
  canceledById: string | null;
  checkinCount: number;
  duration: MembershipDuration;
  lastCheckin: string | null;
  plan: Plan;
}

export interface AssignMembershipDto {
  memberId: string;
  planId: string;
  assignedById: string;
  startDate: string;
  duration: MembershipDuration;
}

export interface CancelMembershipDto {
  memberId: string;
  membershipId: string;
  cancelBy: string;
  cancelReason: string;
}
