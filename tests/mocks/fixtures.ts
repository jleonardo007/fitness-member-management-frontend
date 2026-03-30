import {
  MembershipStatus,
  MembershipDuration,
  IdentificationType,
  UserRoles,
} from '../../src/types/enums';
import type { Member, Membership, CheckIn, Plan } from '../../src/features/members/types';

export const mockUser = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'manager@fitness.com',
  firstName: 'Manager',
  lastName: 'Fitness',
  role: UserRoles.MANAGER,
};

export const mockMember: Member = {
  id: '00000000-0000-0000-0000-000000000002',
  email: 'member@fitness.com',
  firstName: 'John',
  lastName: 'Doe',
  role: UserRoles.MEMBER,
  identificationType: IdentificationType.DNI,
  identificationNumber: '1000000000',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockPlan: Plan = {
  id: '00000000-0000-0000-0000-000000000004',
  tier: 'basic',
  price: 29.99,
  createdAt: new Date().toISOString(),
};

export const mockMembership: Membership = {
  id: '00000000-0000-0000-0000-000000000003',
  status: MembershipStatus.ACTIVE,
  startDate: new Date().toISOString(),
  renovateAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  cancelDate: null,
  cancelReason: '',
  memberId: mockMember.id,
  planId: mockPlan.id,
  assignedById: mockUser.id,
  canceledById: null,
  checkinCount: 5,
  duration: MembershipDuration.MONTHLY,
  lastCheckin: new Date().toISOString(),
  plan: mockPlan,
};

export const mockCheckIn: CheckIn = {
  id: '00000000-0000-0000-0000-000000000005',
  memberId: mockMember.id,
  membershipId: mockMembership.id,
  lastCheckin: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  member: mockMember,
  membership: mockMembership,
};
