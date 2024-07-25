import type { IPeople, IPlanet, ISpecie } from './types';

const allKnownPlanets: IPlanet[] = [];
const allKnownSpecies: ISpecie[] = [];

export type CacheValue = IPeople | IPlanet | ISpecie | undefined;

const localStorageKeyPrefix = 'paul_terhaar_swapi_cache_';

const serialize = (value: any): string => JSON.stringify(value);
const deserialize = (value: string): any => JSON.parse(value);

export const getFromCache = (key: string): CacheValue => {
  const cachedValue = localStorage.getItem(localStorageKeyPrefix + key);
  if (cachedValue) {
    return deserialize(cachedValue);
  }
  return undefined;
};

export const setInCache = (key: string, value: any) => {
  localStorage.setItem(localStorageKeyPrefix + key, serialize(value));
};

// fetch and cache a url's data
export const fetchDataWithCache = async (url: string): Promise<any> => {
  const cachedData = getFromCache(url);
  if (cachedData) {
    return Promise.resolve(cachedData);
  } else {
    const response = await fetch(url, { cache: 'force-cache' });
    const data = await response.json();
    setInCache(url, data);
    return data;
  }
};

export const addToPlanetArray = (planet: IPlanet) => {
  allKnownPlanets.push(planet);
};

export const addToSpeciesArray = (specie: ISpecie) => {
  allKnownSpecies.push(specie);
};

export const getPlanetArray = () => {
  return allKnownPlanets;
};

export const getSpeciesArray = () => {
  return allKnownSpecies;
};
