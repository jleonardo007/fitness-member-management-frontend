export const IdentificationType = {
  DNI: 'dni',
  PASSPORT: 'passport',
  TAX_ID: 'taxId',
} as const;

export const UserRoles = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  MEMBER: 'member',
} as const;

export const MembershipStatus = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  EXPIRED: 'expired',
} as const;

export const MembershipDuration = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  SEMI_ANNUAL: 'semi_annual',
  ANNUAL: 'annual',
} as const;

export type UserRoles = (typeof UserRoles)[keyof typeof UserRoles];
export type MembershipStatus = (typeof MembershipStatus)[keyof typeof MembershipStatus];
export type IdentificationType = (typeof IdentificationType)[keyof typeof IdentificationType];
export type MembershipDuration = (typeof MembershipDuration)[keyof typeof MembershipDuration];
