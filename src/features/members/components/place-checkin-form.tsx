import { ClipboardCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@components/ui';
import { useCheckIn } from '../hooks';
import type { Membership, CheckIn } from '../types';

type PlaceCheckInFormProps = {
  memberId: string;
  activeMembership: Membership;
  checkins: CheckIn[];
  onSuccess: () => void;
};

export const PlaceCheckInForm = ({
  memberId,
  activeMembership,
  checkins,
  onSuccess,
}: PlaceCheckInFormProps) => {
  const { placeCheckIn, isLoading, error } = useCheckIn();

  const handleCheckIn = async () => {
    const result = await placeCheckIn({
      memberId,
      membershipId: activeMembership.id,
      lastCheckin: new Date().toISOString(),
    });

    if (result) onSuccess();
  };

  return (
    <div className='flex flex-col gap-3 p-4 rounded-lg border border-border bg-card'>
      <div className='flex items-start gap-3'>
        <ClipboardCheck className='w-5 h-5 text-primary shrink-0 mt-0.5' />
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm font-semibold text-foreground'>Record Check-in</p>
          <p className='text-xs text-muted-foreground'>
            Last check-in:{' '}
            {checkins.length > 0
              ? new Date(checkins[0].lastCheckin).toLocaleDateString()
              : 'No check-ins yet'}
          </p>
          <p className='text-xs text-muted-foreground'>
            Total check-ins: {activeMembership.checkinCount}
          </p>
        </div>
      </div>

      {error && (
        <div className='flex items-center gap-2 text-xs text-red-500'>
          <AlertTriangle className='w-3.5 h-3.5 shrink-0' />
          {error}
        </div>
      )}

      <Button
        data-testid='place-checkin-btn'
        onClick={handleCheckIn}
        isLoading={isLoading}
        className='w-full'
      >
        <ClipboardCheck className='w-4 h-4' />
        Place Check-in
      </Button>
    </div>
  );
};
