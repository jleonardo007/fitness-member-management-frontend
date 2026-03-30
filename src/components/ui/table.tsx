import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';
import { TableHeader } from './table-header';
import { TablePagination } from './table-pagination';

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

export const Table = <T,>({
  data,
  columns,
  page,
  pageSize,
  total,
  totalPages,
  isLoading = false,
  onPageChange,
}: TableProps<T>) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className='rounded-lg border border-border bg-card overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-4 py-8 text-center text-muted-foreground'
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-4 py-8 text-center text-muted-foreground'
                >
                  No results found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='border-b border-border last:border-0 hover:bg-accent transition-colors'
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='px-4 py-3 text-foreground text-center'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};
