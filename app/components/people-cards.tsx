import { useNavigation } from '@remix-run/react';

import { cn } from '@/lib/styles';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

import type { IPeople } from '@/api/types';

export const PeopleCards = (props: {
  detailedResults?: IPeople[];
  results?: IPeople[];
}) => {
  const { detailedResults, results } = props;

  const navigation = useNavigation();
  const pending = navigation.state !== 'idle';
  const isLoading = !results && !detailedResults;
  const noResults = results && results.length === 0;
  const peopleResults = detailedResults || results;

  // homeworld and species both can be a strings, objects or arrays of either
  // check what we have and proceed appropriately
  const getHomeworldOutput = (homeworld: any, detailedResults?: IPeople[]) => {
    if (detailedResults) {
      return homeworld && typeof homeworld === 'object'
        ? homeworld.name
        : homeworld;
    }
    return 'loading...';
  };

  const getSpeciesOutput = (species: any[], detailedResults?: IPeople[]) => {
    if (detailedResults) {
      return species.length
        ? species.map((specie, index) => (
            <span key={index}>
              {specie && typeof specie === 'object' ? specie.name : specie}
              {index < species.length - 1 && ', '}
            </span>
          ))
        : undefined;
    }
    return 'loading...';
  };

  return (
    <div
      className={'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'}
    >
      {isLoading ? (
        <h3>Loading...</h3>
      ) : noResults ? (
        <h3>No Results</h3>
      ) : (
        peopleResults?.map((person) => {
          const { homeworld, name, species } = person;
          const homeworldOutput = getHomeworldOutput(
            homeworld,
            detailedResults,
          );
          const speciesOutput = getSpeciesOutput(species, detailedResults);

          return (
            <Card
              key={name}
              className={cn(
                'transition-all',
                pending || !detailedResults ? 'scale-[95%] opacity-50' : '',
              )}
            >
              <CardHeader>
                <CardTitle>{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Homeworld:{' '}
                  <span
                    className={cn(
                      'transition-all ',
                      pending || !detailedResults ? 'opacity-50' : '',
                      homeworldOutput ? '' : 'opacity-75',
                    )}
                  >
                    {homeworldOutput || 'unknown'}
                  </span>
                </CardDescription>
                <CardDescription>
                  Species:{' '}
                  <span
                    className={cn(
                      'transition-all ',
                      pending || !detailedResults ? 'opacity-50' : '',
                      speciesOutput ? '' : 'opacity-50',
                    )}
                  >
                    {speciesOutput || 'unknown'}
                  </span>
                </CardDescription>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};
