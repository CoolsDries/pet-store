export interface SpeciesAmountForStores {
    name: string;
    speciesAmounts: { [speciesName: string]: number };
}

export interface CompareSpeciesAmountForStores {
    name: string;
    stores: SpeciesAmountForStores[];
}