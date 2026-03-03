import { useState, useMemo } from 'react';
import { type TableProps, type Column, type SortState } from './Table.types';

function Table<T>({ data, columns, onRowClick, keyExtractor }: TableProps<T>) {
    const [sortState, setSortState] = useState<SortState>({ column: null, direction: 'asc' });

    const handleSort = (column: Column<T>) => {
        if (sortState.direction === 'desc' && sortState.column === column.key) {
            setSortState({ column: null, direction: 'asc' });
        } else if (sortState.column === column.key && sortState.direction === 'asc') {
            setSortState({ column: column.key, direction: 'desc' });
        } else if (typeof column.key === 'string') {
            setSortState({ column: column.key, direction: 'asc' });
        } 
    };

    const sortedData = useMemo(() => {
        if (!sortState.column || !data) {
            return data;
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortState.column as keyof T];
            const bValue = b[sortState.column as keyof T];

            if (aValue === bValue) return 0;

            let comparison = 0;
            if (aValue == null) {
                comparison = 1;
            } else if (bValue == null) {
                comparison = -1;
            } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                comparison = aValue.localeCompare(bValue);
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            } else {
                comparison = String(aValue).localeCompare(String(bValue));
            }

            return sortState.direction === 'asc' ? comparison : -comparison;
        });
    }, [data, sortState]);

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column: Column<T>) => (
                        <th
                            {...(column.sortable && {
                                'aria-sort': sortState.column === column.key
                                    ? (sortState.direction === 'asc' ? 'ascending' : 'descending')
                                    : 'none'
                            })}
                            key={String(column.key)}
                            scope="col"
                            style={{ width: column.width ?? 'auto' }}
                            onClick={() => {
                                if (column.sortable) {
                                    handleSort(column);
                                }
                            }}
                        >
                            {column.header}
                            {sortState.column === column.key && (sortState.direction === 'asc' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke='white' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 2.5V9.5M6 9.5L9.5 6M6 9.5L2.5 6" stroke='white' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ))}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData?.map((row: T) => (
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