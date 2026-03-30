import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

type TablePaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export const TablePagination = ({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: TablePaginationProps) => {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className='flex items-center justify-between px-4 py-3 border-t border-border'>
      <span className='text-sm text-muted-foreground'>
        Showing {from}–{to} of {total}
      </span>
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label='Previous page'
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <span className='text-sm text-muted-foreground'>
          {page} / {totalPages}
        </span>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label='Next page'
        >
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};
