import { Chart } from "chart.js";

export interface SpeciesAmountForStores {
    name: string;
    speciesAmounts: { [speciesName: string]: number };
}

export interface CompareSpeciesAmountForStores {
    name: string;
    stores: SpeciesAmountForStores[];
}

export interface ChartDatasets {
    label: string;
    data: ChartDatasetsData[]
}

export interface ChartDatasetsData {
    x: string;
    y: number;
}

