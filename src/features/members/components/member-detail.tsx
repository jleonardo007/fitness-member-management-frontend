import { useEffect, useState } from 'react';
import { User, CreditCard, Ban } from 'lucide-react';
import { useMember } from '@features/members/hooks';
import {
  CancelMembershipForm,
  AssignMembershipForm,
  PlaceCheckInForm,
} from '@features/members/components';
import { Button } from '@components/ui';
import { MembershipStatus } from '@/types/enums';

type MemberDetailPageProps = {
  id: string;
};

export const MemberDetail = ({ id }: MemberDetailPageProps) => {
  const { member, isLoading, fetchMember } = useMember();
  const [showCancelForm, setShowCancelForm] = useState(false);

  useEffect(() => {
    fetchMember(id);
  }, [id, fetchMember]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-40 text-muted-foreground text-sm'>
        Loading...
      </div>
    );
  }

  if (!member) {
    return (
      <div className='flex items-center justify-center h-40 text-muted-foreground text-sm'>
        Member not found
      </div>
    );
  }

  const activeMembership = member.memberships?.find(
    (membership) => String(membership.status) === MembershipStatus.ACTIVE,
  );

  const handleCancelSuccess = () => {
    setShowCancelForm(false);
    fetchMember(id);
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Personal Info */}
      <section className='flex flex-col gap-3'>
        <div className='flex items-center gap-2 text-sm font-semibold text-foreground'>
          <User className='w-4 h-4 text-primary' />
          Personal Information
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <InfoField label='First Name' value={member.firstName} />
          <InfoField label='Last Name' value={member.lastName} />
          <InfoField label='Email' value={member.email} />
          <InfoField label='ID Type' value={String(member.identificationType).toUpperCase()} />
          <InfoField label='ID Number' value={member.identificationNumber} />
          <InfoField label='Registered' value={new Date(member.createdAt).toLocaleDateString()} />
        </div>
      </section>

      <Divider />

      {/* Active Membership */}
      <section className='flex flex-col gap-3'>
        <div className='flex items-center gap-2 text-sm font-semibold text-foreground'>
          <CreditCard className='w-4 h-4 text-primary' />
          Active Membership
        </div>

        {activeMembership ? (
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-3 gap-3'>
              <InfoField label='Status' value={String(activeMembership.status)} />
              <InfoField label='Tier' value={String(activeMembership.plan.tier)} />
              <InfoField
                label='Start Date'
                value={new Date(activeMembership.startDate).toLocaleDateString()}
              />
              <InfoField
                label='Renews At'
                value={new Date(activeMembership.renovateAt).toLocaleDateString()}
              />
              <InfoField label='Check-ins' value={String(activeMembership.checkinCount)} />
            </div>

            <Divider />

            <PlaceCheckInForm
              memberId={member.id}
              activeMembership={activeMembership}
              checkins={member.checkins}
              onSuccess={() => fetchMember(id)}
            />

            {showCancelForm ? (
              <CancelMembershipForm
                memberId={member.id}
                membershipId={activeMembership.id}
                onSuccess={handleCancelSuccess}
                onCancel={() => setShowCancelForm(false)}
              />
            ) : (
              <Button
                variant='danger'
                size='sm'
                className='mt-2 w-full'
                data-testid='cancel-membership-btn'
                onClick={() => setShowCancelForm(true)}
              >
                <Ban className='w-4 h-4' />
                Cancel Membership
              </Button>
            )}
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <p className='text-sm text-muted-foreground' data-testid='no-membership-msg'>
              No active membership found.
            </p>
            <AssignMembershipForm memberId={member.id} onSuccess={() => fetchMember(id)} />
          </div>
        )}
      </section>
    </div>
  );
};

type InfoFieldProps = {
  label: string;
  value: string;
};

const InfoField = ({ label, value }: InfoFieldProps) => (
  <div className='flex flex-col gap-0.5'>
    <span className='text-xs text-muted-foreground'>{label}</span>
    <span className='text-sm font-medium text-foreground'>{value}</span>
  </div>
);

const Divider = () => <hr className='border-border' />;
