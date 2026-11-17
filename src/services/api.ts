import type {
  Character,
  CharactersResponse,
  EpisodesResponse,
  LocationsResponse,
} from "../types/rickAndMorty";

const API_URL = "https://rickandmortyapi.com/api";

export interface CharacterFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
  page: number;
}

export const getCharacters = async (
  filters: CharacterFilters,
  signal?: AbortSignal,
): Promise<CharactersResponse> => {
  const params = new URLSearchParams();

  params.set("page", String(filters.page));

  if (filters.name) {
    params.set("name", filters.name);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.species) {
    params.set("species", filters.species);
  }

  if (filters.gender) {
    params.set("gender", filters.gender);
  }

  const response = await fetch(`${API_URL}/character/?${params.toString()}`, {
    signal,
  });

  // The API returns 404 when no characters match.
  if (response.status === 404) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data: CharactersResponse = await response.json();

  return data;
};

export const getCharactersByIds = async (
  ids: number[],
  signal?: AbortSignal,
): Promise<Character[]> => {
  if (ids.length === 0) {
    return [];
  }

  const response = await fetch(`${API_URL}/character/${ids.join(",")}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch favourite characters");
  }

  const data: Character | Character[] = await response.json();

  return Array.isArray(data) ? data : [data];
};

export const getEpisodes = async (
  page: number = 1,
  signal?: AbortSignal,
): Promise<EpisodesResponse> => {
  const response = await fetch(`${API_URL}/episode/?page=${page}`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }

  return await response.json();
};

export const getLocations = async (
  page: number = 1,
  signal?: AbortSignal,
): Promise<LocationsResponse> => {
  const response = await fetch(`${API_URL}/location/?page=${page}`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return await response.json();
};
