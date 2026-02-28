import './App.css'
import Table from './Table/Table';
import type { Column } from './Table.types';


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
    ];

    const columns: Column<DogBreed>[] = [
        {
            key: 'id',
            header: 'ID',
            sortable: true,
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
        },
        {
            key: 'weight',
            header: 'Weight',
            sortable: true,
            render: (row) => `${row.weight} kg`,
        },
        {
            key: 'isHypoallergenic',
            header: 'Hypoallergenic',
            sortable: true,
            render: (row) => row.isHypoallergenic ? 'Yes' : 'No',
        },
        {
            key: 'traits',
            header: 'Traits',
            sortable: false,
            render: (row) => row.traits?.join(', ') ?? 'N/A',
        },
        {
            key: 'registeredDate',
            header: 'Registered Date',
            sortable: true,
            render: (row) => row.registeredDate?.toLocaleDateString() ?? 'N/A',
        },
        {
            key: 'image',
            header: 'Image',
            sortable: true,
            render: (row) => row.image ?? 'No image',
        },
        {
            key: 'temperament',
            header: 'Temperament',
            sortable: false,
            render: (row) => `Friendly: ${row.temperament.friendly}/5, Protective: ${row.temperament.protective}/5`,
        },
        {
            key: 'vaccination',
            header: 'Vaccination',
            sortable: true,
            render: (row) => row.vaccination ?? 'N/A',
        },
    ];

    const handleRowClick = () => {

    }

    const keyExtractor = () => {
        return ''
    }

  return (
    <div>
          <Table data={dogBreeds} columns={columns} keyExtractor={keyExtractor} onRowClick={handleRowClick} />
    </div>
  )
}

export default App
