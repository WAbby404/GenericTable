export interface Temperament {
    friendly: number;
    protective: number;
    playful: number;
}

export interface DogBreed {
    id: number;
    name: string;
    origin: string;
    size: string;
    weight: number;
    isHypoallergenic: boolean;
    lifeExpectancy: number;
    energyLevel: number;
    traits: string[];
    description: string;
    registeredDate: Date;
    image: string | null;
    temperament: Temperament;
    vaccination: any | undefined;
}