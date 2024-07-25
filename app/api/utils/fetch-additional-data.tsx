import { getFromCache, setInCache } from '@/api/cache';

import type { IPeople } from '../types';

export const fetchAdditionalPersonData = async (
  person: IPeople,
): Promise<IPeople> => {
  const { homeworld, species } = person;

  const fetchDataWithCache = async (url: string): Promise<any> => {
    const cachedData = getFromCache(url);
    if (cachedData) {
      console.log(`Data pulled from cache: ${url}`);
      return Promise.resolve(cachedData);
    } else {
      console.log(`Fetching data from: ${url}`);
      const response = await fetch(url, { cache: 'force-cache' });
      const data = await response.json();
      setInCache(url, data);
      return data;
    }
  };

  // Deduplicate URLs
  const uniqueUrls = Array.from(new Set([homeworld, ...species]));

  // Fetch all unique URLs with caching
  const fetchPromises = uniqueUrls.map((url) =>
    fetchDataWithCache(url as string),
  );
  const fetchedData = await Promise.all(fetchPromises);

  // Map fetched data back to homeworld and species
  const homeworldData = fetchedData.find((data) => data.url === homeworld);
  const speciesData = species.map((url) =>
    fetchedData.find((data) => data.url === url),
  );

  return {
    ...person,
    homeworld: homeworldData ? homeworldData.name : homeworld,
    species: speciesData.map((specie) => (specie ? specie.name : specie)),
  };
};
