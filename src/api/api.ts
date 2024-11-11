import { FilmsFetchResponse } from "../types/filmsFetchResponse";
import { PeopleFetchResponse } from "../types/peopleFetchResponse";
import { StarshipsFetchResponse } from "../types/starshipsFetchResponse";

const BASE_URL = 'https://sw-api.starnavi.io';

// Generic function to perform a GET request
function get<T>(url: string): Promise<T> {
  // Construct the full URL by appending the endpoint to the base URL
  const fullURL = BASE_URL + url;

  // Fetch data from the API and return the parsed JSON response
  return fetch(fullURL)
    .then(res => res.json())
}

// Function to fetch characters, accepting a page number as a parameter
export const getCharacters = (pageNumber: number) => get<PeopleFetchResponse>(`/people?page=${pageNumber}`);

// Function to fetch films related to a specific character
export const getFilms = (characterId: string) => get<FilmsFetchResponse>(`/films/?characters__in=${characterId}`);

// Function to fetch starships related to a specific character
export const getStarships = (characterId: string) => get<StarshipsFetchResponse>(`/starships/?pilots__in=${characterId}`);

