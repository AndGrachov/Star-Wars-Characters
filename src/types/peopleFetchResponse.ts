import { Person } from "./person";

export type PeopleFetchResponse = {
    count: number;
    results: Person[];
}