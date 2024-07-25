import { useCallback, useEffect, useState } from 'react';

import { redirect, useSearchParams } from '@remix-run/react';

import { fetchDataWithCache } from '@/api/cache';
import { usePeopleDetails } from '@/api/hooks/use-people-details';
import { usePlanets } from '@/api/hooks/use-planets';
import { PeopleCards } from '@/components/people-cards';
import { SearchPlanetsAndSpecies } from '@/components/search-planets-and-species';
import { title } from '@/config.shared';

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import type { IPeople, IPlanet } from '../api/types';

export const meta: MetaFunction = () => {
  return [
    { title: title('Planet Search') },
    { name: 'description', content: 'StarWars Search' },
  ];
};

// loading planets locally so we can see the progress update. nothing to return
export async function loader({ request }: LoaderFunctionArgs) {
  return {};
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const body = await request.formData();
  const planet = body.get('planet') as string;
  const search = body.get('search') as string;

  const newSearchParams = new URLSearchParams(url.searchParams);
  newSearchParams.set('planet', planet || '');
  newSearchParams.set('search', search || '');
  newSearchParams.set('page', '');

  return redirect(`?${newSearchParams}`);
};

export default function Planet() {
  const { percentLoaded, planets } = usePlanets();

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search') || '';
  const searchPlanet = searchParams.get('planet') || '';

  const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | undefined>();

  // planet's people loaded individually from their endpoints
  const [planetPeople, setPlanetPeople] = useState<IPeople[]>();
  // planet's people after homeworld and species have been resolved
  const planetPeopleDetails = usePeopleDetails(planetPeople);

  // people filtered by the search text
  const filteredPlanetPeople = searchText
    ? planetPeopleDetails?.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : planetPeopleDetails;

  // planets formatted for dropdown
  const planetOptions = planets.length
    ? planets.map((planet) => ({
        value: planet.name.toLowerCase(),
        label: `${planet.name} — Residents: ${planet.residents.length}`,
      }))
    : [{ value: '', label: 'Loading Planets...' }];

  // handlers

  const handlePlanetChange = useCallback(
    (value: string) => {
      const matchingPlanet = planets.find(
        (planet) => planet.name.toLowerCase() === value.toLowerCase(),
      );

      setSelectedPlanet(matchingPlanet ? matchingPlanet : undefined);
    },
    [planets],
  );

  // effects

  // when the url search params change, update state
  useEffect(() => {
    handlePlanetChange(searchPlanet);
  }, [handlePlanetChange, searchPlanet]);

  // fetch all residents of a selected planet
  useEffect(() => {
    if (!selectedPlanet) {
      setPlanetPeople([]);
      // setPlanetPeopleDetails([]);
    } else {
      const fetchPlanetResidents = async () => {
        const residentUrls = selectedPlanet.residents as string[];

        // Fetch and cache all planet people
        const planetResidentsDetails = Promise.all(
          residentUrls.map(async (url: string): Promise<IPeople> => {
            return fetchDataWithCache(url as string);
          }),
        );

        // Wait for all resident data to be fetched
        const residentsData = await planetResidentsDetails;

        // set state to be fed to cards
        setPlanetPeople(residentsData);
      };

      fetchPlanetResidents();
    }
  }, [selectedPlanet]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <SearchPlanetsAndSpecies
        searchText={searchText}
        searchDropdown={searchPlanet}
        options={planetOptions}
        onDropdownChange={handlePlanetChange}
        searchPrompt="Select Planet..."
      ></SearchPlanetsAndSpecies>

      <div className="prose">
        <h4>
          {percentLoaded < 100
            ? `Loading Planets: ${Math.round(percentLoaded)}%`
            : `Total Results: ${
                planetPeople?.length || 0
              } | Filtered Results: ${filteredPlanetPeople?.length || 0}`}
        </h4>
      </div>

      <PeopleCards
        results={planetPeople}
        detailedResults={filteredPlanetPeople}
      />
    </div>
  );
}
