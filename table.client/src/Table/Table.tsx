import React from 'react';
import { type TableProps, type Column } from '../Table.types.ts';
function Table<T>({ data, columns, onRowClick, keyExtractor}: TableProps<T>) {
  

    return (
            <table>
                <thead>
                    <tr>
                        {columns.map((column: Column<T>) => {
                            return (
                                <th key={column.header} scope='col' style={{ width: `${column.width ?? 'auto' }` }}>
                                    {column.header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row: T) => {
                        return (
                            <tr key={keyExtractor(row)} onClick={() => onRowClick?.(row)}>
                                {
                                    columns.map((column, index2) => {
                                        const value = row[column.key as keyof T];

                                        return (
                                            <td key={index2}>
                                                {column.render ? column.render(value, row) : (value as React.ReactNode)}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    );
}

export default Table;