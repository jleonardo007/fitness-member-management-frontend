import type { Member } from './member';
import type { Membership } from './membership';

export interface CheckIn {
  id: string;
  memberId: string;
  membershipId: string;
  lastCheckin: string;
  createdAt: string;
  updatedAt: string;
  member: Member;
  membership: Membership;
}

export interface PlaceCheckInDto {
  memberId: string;
  membershipId: string;
  lastCheckin: string;
}
