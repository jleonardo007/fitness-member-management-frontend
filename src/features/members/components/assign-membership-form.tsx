import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dumbbell, Crown, Star } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import { Form, FormControl, Button, Input } from '@/components/ui';
import { usePlans, useAssignMembership } from '../hooks';
import { AssignMembershipSchema, type AssignMembershipFormValues } from '../schemas';
import { MembershipDuration } from '@/types/enums';
import type { Plan } from '../types/plan';

const planIcons: Record<string, React.ReactNode> = {
  basic: <Dumbbell className='w-5 h-5' />,
  premium: <Star className='w-5 h-5' />,
  vip: <Crown className='w-5 h-5' />,
};

const durationOptions = [
  { label: 'Monthly', value: MembershipDuration.MONTHLY },
  { label: 'Quarterly', value: MembershipDuration.QUARTERLY },
  { label: 'Semi-Annual', value: MembershipDuration.SEMI_ANNUAL },
  { label: 'Annual', value: MembershipDuration.ANNUAL },
];

type PlanCardProps = {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
};

const PlanCard = ({ plan, selected, onSelect }: PlanCardProps) => (
  <Button
    type='button'
    data-testid={`plan-tier-${plan.tier}`}
    onClick={onSelect}
    className={`
      flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer
      transition-all duration-150 text-center
      ${
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-card text-foreground hover:border-primary/50'
      }
    `}
  >
    <span className={selected ? 'text-primary' : 'text-muted-foreground'}>
      {planIcons[plan.tier] ?? <Dumbbell className='w-5 h-5' />}
    </span>
    <span className='text-sm font-semibold capitalize'>{plan.tier}</span>
    <span className='text-lg font-bold'>${Number(plan.price).toFixed(2)}</span>
    <span className='text-xs text-muted-foreground'>/ month</span>
  </Button>
);

type AssignMembershipFormProps = {
  memberId: string;
  onSuccess: () => void;
};

export const AssignMembershipForm = ({ memberId, onSuccess }: AssignMembershipFormProps) => {
  const { user } = useAuth();
  const { plans, isLoading: plansLoading, fetchPlans } = usePlans();
  const { assignMembership, isLoading, error } = useAssignMembership();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignMembershipFormValues>({
    resolver: zodResolver(AssignMembershipSchema),
    defaultValues: {
      planId: '',
    },
  });

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const onSubmit = async (values: AssignMembershipFormValues) => {
    const result = await assignMembership({
      memberId,
      planId: values.planId,
      assignedById: user!.id,
      startDate: values.startDate.toISOString(),
      duration: values.duration,
    });

    if (result) onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Plan selection */}
      <FormControl label='Select Plan' required error={errors.planId?.message}>
        <Controller
          name='planId'
          control={control}
          render={({ field }) => (
            <div className='grid grid-cols-3 gap-3'>
              {plansLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='h-32 rounded-lg bg-accent animate-pulse' />
                  ))
                : plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      selected={field.value === plan.id}
                      onSelect={() => field.onChange(plan.id)}
                    />
                  ))}
            </div>
          )}
        />
      </FormControl>

      {/* Duration selection */}
      <FormControl label='Duration' required error={errors.duration?.message}>
        <Controller
          name='duration'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col gap-2'>
              {durationOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer
                    transition-all duration-150
                    ${
                      field.value === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <input
                    type='radio'
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className='accent-primary'
                  />
                  <span className='text-sm font-medium'>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </FormControl>

      <FormControl label='Start Date' required error={errors.startDate?.message}>
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <Input
              type='date'
              data-testid='start-date-input'
              value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
              onChange={(e) => field.onChange(new Date(e.target.value || null!))}
              min={new Date().toISOString().split('T')[0]}
            />
          )}
        />
      </FormControl>

      {error && <p className='text-xs text-red-500'>{error}</p>}

      <Button
        type='submit'
        isLoading={isLoading}
        className='w-full'
        data-testid='assign-membership-btn'
      >
        Assign Membership
      </Button>
    </Form>
  );
};
