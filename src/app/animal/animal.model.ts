export interface Animal {
    id?: number;           // only used in GET
    name: string;
    price: number;
    description: string;
    storeId?: number;       // only used in POST
    speciesId?: number;     // only used in POST

}
