import { z } from 'zod';
import { IdentificationType, UserRoles } from '@/types/enums';

export const CreateMemberSchema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Must contain at least one special character'),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  identificationType: z.enum(Object.values(IdentificationType), {
    message: 'Please select an identification type',
  }),
  identificationNumber: z.string().regex(/^\d+$/, 'Must contain only numbers').min(5).max(20),
  role: z.enum(Object.values(UserRoles), { message: 'Please select a role' }),
});

export type CreateMemberFormValues = z.infer<typeof CreateMemberSchema>;
