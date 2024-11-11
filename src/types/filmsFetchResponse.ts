import { Film } from "./film";

export type FilmsFetchResponse = {
    count: number;
    results: Film[];
}