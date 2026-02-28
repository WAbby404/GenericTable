import { useState } from 'react';
import { type TableProps, type Column, type SortState } from './Table.types';

function Table<T>({ data, columns, onRowClick, keyExtractor }: TableProps<T>) {
    const [sort, setSort] = useState<SortState>({ column: null, direction: 'asc' });

    const handleSort = (column: Column<T>) => {
        if (sort.direction === 'desc' && sort.column === column.key) {
            setSort({ column: null, direction: 'asc' });
        } else if (sort.column === column.key && sort.direction === 'asc') {
            setSort({ column: column.key, direction: 'desc' });
        } else if (typeof column.key === 'string') {
            setSort({ column: column.key, direction: 'asc' });
        } 

    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column: Column<T>) => (
                        <th
                            key={String(column.key)}
                            scope="col"
                            style={{ width: column.width ?? 'auto' }}
                            onClick={() => handleSort(column)}
                        >
                            {column.header}
                            {sort.column === column.key && (sort.direction === 'asc' ? ' ^' : ' V')}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row: T) => (
                    <tr
                        key={keyExtractor(row)}
                        onClick={() => onRowClick?.(row)}
                    >
                        {columns.map((column: Column<T>) => {
                            const value = row[column.key as keyof T];
                            return (
                                <td key={`${keyExtractor(row)}-${String(column.key)}`}>
                                    {column.render
                                        ? column.render(value, row)
                                        : (value as React.ReactNode)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;