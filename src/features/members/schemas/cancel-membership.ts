import { z } from 'zod';

export const CancelMembershipSchema = z.object({
  cancelReason: z.string().min(10, 'Reason must be at least 10 characters'),
});

export type CancelMembershipFormValues = z.infer<typeof CancelMembershipSchema>;
