import { Starship } from "./starship";

export type StarshipsFetchResponse = {
    count: number;
    results: Starship[];
}