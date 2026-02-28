import type React from 'react';
import { type TableProps, type Column } from './Table.types';

function Table<T>({ data, columns, onRowClick, keyExtractor }: TableProps<T>) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column: Column<T>) => (
                        <th
                            key={column.header}
                            scope="col"
                            style={{ width: column.width ?? 'auto' }}
                        >
                            {column.header}
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
                        {columns.map((column, index) => {
                            const value = row[column.key as keyof T];
                            return (
                                <td key={index}>
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