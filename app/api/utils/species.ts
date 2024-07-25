import { addToSpeciesArray, getSpeciesArray, setInCache } from '../cache';

import type { ISpecie, SpecieApiResponse } from '../types';

export async function fetchSpecies(
  url: string = 'https://swapi.dev/api/species',
  species: ISpecie[] = [],
  progress?: (count: number, species: ISpecie[]) => void,
): Promise<ISpecie[]> {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const data: SpecieApiResponse = await response.json();
  const updatedSpecies = species.concat(data.results);
  progress && progress(Number(data.count), updatedSpecies);

  if (data.next) {
    return fetchSpecies(data.next, updatedSpecies, progress);
  } else {
    return updatedSpecies;
  }
}

export function cacheSpecies(species: ISpecie[]) {
  species.forEach((specie) => {
    addToSpeciesArray(specie);
    setInCache(specie.url, specie);
  });
}

export async function getCachedSpecies(
  progress?: (count: number, species: ISpecie[]) => void,
): Promise<ISpecie[]> {
  let allSpecies = getSpeciesArray();
  if (allSpecies.length === 0) {
    allSpecies = await fetchSpecies(
      undefined,
      [],
      (count: number, fetchedSpecies: ISpecie[]) => {
        progress && progress(count, fetchedSpecies);
      },
    );
    cacheSpecies(allSpecies);
  }
  return allSpecies;
}
