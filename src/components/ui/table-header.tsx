import { flexRender, type HeaderGroup } from '@tanstack/react-table';

type TableHeaderProps<T> = {
  headerGroups: HeaderGroup<T>[];
};

export const TableHeader = <T,>({ headerGroups }: TableHeaderProps<T>) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className='px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border'
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
