import { fetchDataWithCache } from '@/api/cache';

import type { IPeople } from '../types';

export const fetchPersonDetails = async (person: IPeople): Promise<IPeople> => {
  const { homeworld, species } = person;

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
