import { useMemo } from 'react';
import { Eye } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { Table, Button } from '@components/ui';
import type { Member } from '../types';

type MembersTableProps = {
  data: Member[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onViewMember: (id: string) => void;
};

export const MembersTable = ({
  data,
  page,
  pageSize,
  total,
  totalPages,
  isLoading,
  onPageChange,
  onViewMember,
}: MembersTableProps) => {
  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: ({ getValue }) => (
          <span className='font-mono text-xs text-muted-foreground truncate max-w-20 block'>
            {(getValue() as string).slice(0, 8)}...
          </span>
        ),
      },
      {
        header: 'Full Name',
        cell: ({ row }) => (
          <span className='font-medium'>
            {row.original.firstName} {row.original.lastName}
          </span>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'ID Type',
        accessorKey: 'identificationType',
        cell: ({ getValue }) => (
          <span className='uppercase text-xs font-semibold'>{getValue() as string}</span>
        ),
      },
      {
        header: 'ID Number',
        accessorKey: 'identificationNumber',
      },
      {
        header: 'Registered',
        accessorKey: 'createdAt',
        cell: ({ getValue }) => <span>{new Date(getValue() as string).toLocaleDateString()}</span>,
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant='ghost'
            size='sm'
            data-testid={`view-member-${row.original.id}`}
            onClick={() => onViewMember(row.original.id)}
            aria-label='View member'
          >
            <Eye className='w-4 h-4' />
          </Button>
        ),
      },
    ],
    [onViewMember],
  );

  return (
    <Table
      data={data}
      columns={columns}
      page={page}
      pageSize={pageSize}
      total={total}
      totalPages={totalPages}
      isLoading={isLoading}
      onPageChange={onPageChange}
    />
  );
};
