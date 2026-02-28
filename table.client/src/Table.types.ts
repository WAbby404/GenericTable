import type React from 'react';

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (rowData: T) => string;
    onRowClick?: (rowData: T) => void;
}
export interface Column<T> {
    key: keyof T;
    header: string;
    sortable?: boolean;
    width?: string;
    render?: (value: T[keyof T], rowData: T) => React.ReactNode;
}

export interface SortState {
    column: string | null;
    direction: 'asc' | 'desc';
}


