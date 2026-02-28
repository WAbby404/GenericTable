# Generic Table Component

## Overview:
This is a reusable, type-safe table component for React. It supports generic types and functionality like pagination, sorting, searching and filtering.

## Basic Usage:
Three Props are required for your Table:
1. data 
    - an array of the data you want to display in the table
	- can have any values
2. columns 
    - an array of Column objs correlating to each key in data
	- a column requires two values:
		+ key - the key this column matches in data
		+ header - a string of what you want the header to display
3. keyExtractor - returns a unique key for rows

'''
---- Basic Example ----
import Table from './Table/Table';
import type { Column } from './Table/Table.types';

interface Dog {
    id: number;
    name: string;
    breed: string;
}

const dogs: Dog[] = [
    { id: 1, name: 'Max', breed: 'Golden Retriever' },
    { id: 2, name: 'Bella', breed: 'Labrador' },
];
const columns: Column<Dog>[] = [
    { key: 'name', header: 'Name' },
    { key: 'breed', header: 'Breed' },
];

<Table
    data={dogs}
    columns={columns}
    keyExtractor={(dog) => dog.id.toString()}
/>
---- Basic Example ----

## Column Examples
Simple - display the value | Formatted - format a number, boolean, date, array | Fixed Width - fix the width to a preset value

Simple: { key: 'name', header: 'Name' }
Formatted: { key: 'weight', header: 'Weight', render: (value) => `${value} kg` } 
		   { key: 'isActive', header: 'Active', render: (value) => value ? 'Yes' : 'No' } 
		   { key: 'createdAt', header: 'Created', render: (value) => (value as Date).toLocaleDateString() }
		   { key: 'temperament', header: 'Temperament', render: (_value, row) => `${row.friendly}/5 friendly` }
Fixed Width: { key: 'id', header: 'ID', width: '80px' }


## API References:
TableProps<T>
	data: T[] 
		- this is the shape of your data being displayed in the table, represented by T
	columns: Column<T>[]; 
		- this is the shape of the columns displayed in the table
		- tells us column header text, key, if sortable, width & if needed render help
	keyExtractor: (rowData: T) => string 
		- returns a unique key for rows
	onRowClick?: (rowData: T) => void 
		- optional, does something when a row is clicked

Column<T> 
	key: keyof T 
		- ties the column back to the data obj for functionality 
	header: string 
		- what the column displays on the table
	sortable?: boolean 
		- optional, T or F on sorting
	width?: string 
		- optional, width size for CSS
	render?: (value: T[keyof T], rowData: T) => React.ReactNode 
		- optional, a fn we will later put on each cell in a column to make dates & other render prettier

## Using:
These files are required to use this component:
Table/ - take this whole file
	Table.tsx
	Table.css
	Table.types.ts

## Dependencies
- React 18+
- TypeScript
