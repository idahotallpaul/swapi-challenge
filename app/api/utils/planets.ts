import { addToPlanetArray, getPlanetArray, setInCache } from '../cache';

import type { IPlanet, PlanetApiResponse } from '../types';

export async function fetchPlanets(
  url: string = 'https://swapi.dev/api/planets',
  planets: IPlanet[] = [],
  progress?: (count: number, planets: IPlanet[]) => void,
): Promise<IPlanet[]> {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const data: PlanetApiResponse = await response.json();

  const updatedPlanets = planets.concat(data.results);
  progress && progress(Number(data.count), updatedPlanets);

  if (data.next) {
    return fetchPlanets(data.next, updatedPlanets, progress);
  } else {
    return updatedPlanets;
  }
}

export function cachePlanets(planets: IPlanet[]) {
  planets.forEach((planet) => {
    addToPlanetArray(planet);
    setInCache(planet.url, planet);
  });
}

export async function getCachedPlanets(
  progress?: (count: number, planets: IPlanet[]) => void,
): Promise<IPlanet[]> {
  let allPlanets = getPlanetArray();
  if (allPlanets.length === 0) {
    allPlanets = await fetchPlanets(
      undefined,
      [],
      (count: number, fetchedPlanets: IPlanet[]) => {
        progress && progress(count, fetchedPlanets);
      },
    );
    cachePlanets(allPlanets);
  }
  return allPlanets;
}
