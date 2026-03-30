import { useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useCheckIns } from '@features/members/hooks';
import { Table } from '@components/ui';
import { MembershipStatus } from '@/types/enums';
import type { CheckIn } from '@features/members/types';

const PAGE_SIZE = 20;

export const CheckInsPage = () => {
  const { checkIns, isLoading, meta, fetchCheckIns } = useCheckIns();

  useEffect(() => {
    fetchCheckIns(1, PAGE_SIZE);
  }, [fetchCheckIns]);

  const handlePageChange = (page: number) => {
    fetchCheckIns(page, PAGE_SIZE);
  };

  const columns = useMemo<ColumnDef<CheckIn>[]>(
    () => [
      {
        header: 'Member',
        cell: ({ row }) => (
          <span className='font-medium'>
            {row.original.member.firstName} {row.original.member.lastName}
          </span>
        ),
      },
      {
        header: 'Last Check-in',
        accessorKey: 'lastCheckin',
        cell: ({ getValue }) => <span>{new Date(getValue() as string).toLocaleDateString()}</span>,
      },
      {
        header: 'Total Check-ins',
        cell: ({ row }) => (
          <span className='font-semibold'>{row.original.membership.checkinCount}</span>
        ),
      },
      {
        header: 'Membership',
        cell: ({ row }) => {
          const status = String(row.original.membership.status);
          const isActive = status === MembershipStatus.ACTIVE;
          return (
            <span
              className={`
                inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                ${
                  isActive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }
              `}
            >
              {status}
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-3'>
        <ClipboardList className='w-6 h-6 text-primary' />
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Check-ins</h1>
          <p className='text-sm text-muted-foreground mt-1'>All member check-in records</p>
        </div>
      </div>

      <Table
        data={checkIns}
        columns={columns}
        page={meta.page}
        pageSize={meta.pageSize}
        total={meta.total}
        totalPages={meta.totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
