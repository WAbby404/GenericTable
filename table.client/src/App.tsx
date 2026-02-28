import './App.css'
import Table from './Table/Table';
import type { Column } from './Table/Table.types';


export interface Temperament {
    friendly: number;
    protective: number;
}

export interface DogBreed {
    id: number;
    name: string;
    origin: string;
    weight: number;
    isHypoallergenic: boolean;
    traits: string[];
    registeredDate: Date;
    image: string | null;
    temperament: Temperament;
    vaccination: any | undefined;
}

function App() {

    const dogBreeds: DogBreed[] = [
        {
            id: 1,
            name: "Golden Retriever",
            origin: "Scotland",
            weight: 30.5,
            isHypoallergenic: false,
            traits: ["Friendly", "Intelligent", "Devoted"],
            registeredDate: new Date("2020-01-15"),
            image: null,
            temperament: {
                friendly: 5,
                protective: 3,
            },
            vaccination: undefined
        },
        {
            id: 2,
            name: "Pembroke Welsh Corgi",
            origin: "Wales",
            weight: 25,
            isHypoallergenic: false,
            traits: ["Friendly", "Diligent", "Silly"],
            registeredDate: new Date("2020-01-15"),
            image: null,
            temperament: {
                friendly: 5,
                protective: 3,
            },
            vaccination: undefined
        },
    ];

    const columns: Column<DogBreed>[] = [
        {
            key: 'id',
            header: 'ID',
            sortable: true,
            width: '100px'
        },
        {
            key: 'name',
            header: 'Name',
            sortable: true,
        },
        {
            key: 'origin',
            header: 'Origin',
            sortable: true,
            width: '100px'
        },
        {
            key: 'weight',
            header: 'Weight',
            sortable: true,
            render: (value) => `${value} kg`,
            width: '100px'
        },
        {
            key: 'isHypoallergenic',
            header: 'Hypoallergenic',
            sortable: true,
            render: (value) => value ? 'Yes' : 'No',
            width: '100px'
        },
        {
            key: 'traits',
            header: 'Traits',
            sortable: false,
            render: (value) => (value as string[])?.join(', ') ?? 'N/A',
            width: '200px'
        },
        {
            key: 'registeredDate',
            header: 'Registered Date',
            sortable: true,
            render: (value) => (value as Date)?.toLocaleDateString() ?? 'N/A',
        },
        {
            key: 'image',
            header: 'Image',
            sortable: true,
            render: (value) => (value as string) ?? 'No image',
            width: '100px'
        },
        {
            key: 'temperament',
            header: 'Temperament',
            sortable: false,
            render: (_value, row) => `Friendly: ${row.temperament.friendly}/5, Protective: ${row.temperament.protective}/5`,
        },
        {
            key: 'vaccination',
            header: 'Vaccination',
            sortable: true,
            render: (value) => (value as string) ?? 'N/A',
        },
    ];

    const handleRowClick = () => {
      
    }

    const keyExtractor = (row: DogBreed) => {
        return `${row.id}`
    }

  return (
    <div>
          <Table data={dogBreeds} columns={columns} keyExtractor={keyExtractor} onRowClick={handleRowClick} />
    </div>
  )
}

export default App
