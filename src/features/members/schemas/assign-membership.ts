import { z } from 'zod';
import { MembershipDuration } from '@/types/enums';

export const AssignMembershipSchema = z.object({
  planId: z.uuid('Please select a plan'),
  duration: z.enum(MembershipDuration, { message: 'Please select a duration' }),
  startDate: z.date(),
});

export type AssignMembershipFormValues = z.infer<typeof AssignMembershipSchema>;
