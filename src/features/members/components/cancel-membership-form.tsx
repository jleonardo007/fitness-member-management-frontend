import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CancelMembershipSchema, type CancelMembershipFormValues } from '../schemas';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks';
import { Form, FormControl, Input, Button } from '@components/ui';
import { useCancelMembership } from '../hooks';

type CancelMembershipFormProps = {
  memberId: string;
  membershipId: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export const CancelMembershipForm = ({
  memberId,
  membershipId,
  onSuccess,
  onCancel,
}: CancelMembershipFormProps) => {
  const { user } = useAuth();
  const { cancelMembership, isLoading, error } = useCancelMembership();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CancelMembershipFormValues>({
    resolver: zodResolver(CancelMembershipSchema),
  });

  const onSubmit = async (values: CancelMembershipFormValues) => {
    const result = await cancelMembership({
      memberId,
      membershipId,
      cancelBy: user!.id,
      cancelReason: values.cancelReason,
    });

    if (result) onSuccess();
  };

  return (
    <div className='flex flex-col gap-4 p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900'>
      {/* Warning */}
      <div className='flex items-start gap-3'>
        <AlertTriangle className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm font-semibold text-red-600' data-testid='cancel-warning'>
            Cancel Membership
          </p>
          <p className='text-xs text-red-500 dark:text-red-400'>
            This action cannot be undone. Please provide a reason.
          </p>
        </div>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          label='Cancellation Reason'
          htmlFor='cancelReason'
          required
          error={errors.cancelReason?.message}
        >
          <Input
            id='cancelReason'
            data-testid='cancel-reason-input'
            placeholder='e.g. Member requested cancellation...'
            hasError={!!errors.cancelReason}
            {...register('cancelReason')}
          />
        </FormControl>

        {error && <p className='text-xs text-red-500'>{error}</p>}

        <div className='flex gap-2'>
          <Button
            type='button'
            data-testid='keep-membership-btn'
            variant='ghost'
            size='sm'
            className='flex-1'
            onClick={onCancel}
            disabled={isLoading}
          >
            Keep Membership
          </Button>
          <Button
            type='submit'
            data-testid='confirm-cancel-btn'
            variant='danger'
            size='sm'
            className='flex-1'
            isLoading={isLoading}
          >
            Confirm Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};
