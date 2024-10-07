export interface Stock {
    storeName: string,
    speciesStocks: SpeciesStock[]
}

export interface SpeciesStock {
    speciesName: string,
    animalsAmount: number
}
