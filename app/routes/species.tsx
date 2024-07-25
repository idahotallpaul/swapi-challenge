import { useCallback, useEffect, useState } from 'react';

import { redirect, useSearchParams } from '@remix-run/react';

import { fetchDataWithCache } from '@/api/cache';
import { usePeopleDetails } from '@/api/hooks/use-people-details';
import { useSpecies } from '@/api/hooks/use-species';
import { PeopleCards } from '@/components/people-cards';
import { SearchPlanetsAndSpecies } from '@/components/search-planets-and-species';
import { title } from '@/config.shared';

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import type { IPeople, ISpecie } from '../api/types';

export const meta: MetaFunction = () => {
  return [
    { title: title('Specie Search') },
    { name: 'description', content: 'StarWars Search' },
  ];
};

// loading species locally so we can see the progress update. nothing to return
export async function loader({ request }: LoaderFunctionArgs) {
  return {};
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const body = await request.formData();
  const species = body.get('species') as string;
  const search = body.get('search') as string;

  const newSearchParams = new URLSearchParams(url.searchParams);
  newSearchParams.set('species', species || '');
  newSearchParams.set('search', search || '');
  newSearchParams.set('page', '');

  return redirect(`?${newSearchParams}`);
};

export default function Specie() {
  const { percentLoaded, species } = useSpecies();

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search') || '';
  const searchSpecie = searchParams.get('species') || '';

  const [selectedSpecie, setSelectedSpecie] = useState<ISpecie | undefined>();

  // species's people loaded individually from their endpoints
  const [speciesPeople, setSpeciePeople] = useState<IPeople[]>();
  // species's people after homeworld and species have been resolved
  const speciesPeopleDetails = usePeopleDetails(speciesPeople);

  // people filtered by the search text
  const filteredSpeciePeople = searchText
    ? speciesPeopleDetails?.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : speciesPeopleDetails;

  // species formatted for dropdown
  const speciesOptions = species.length
    ? species.map((species) => ({
        value: species.name.toLowerCase(),
        label: `${species.name} — Residents: ${species.people.length}`,
      }))
    : [{ value: '', label: 'Loading Species...' }];

  // handlers

  const handleSpecieChange = useCallback(
    (value: string) => {
      const matchingSpecie = species.find(
        (species) => species.name.toLowerCase() === value.toLowerCase(),
      );

      setSelectedSpecie(matchingSpecie ? matchingSpecie : undefined);
    },
    [species],
  );

  // effects

  // when the url search params change, update state
  useEffect(() => {
    handleSpecieChange(searchSpecie);
  }, [handleSpecieChange, searchSpecie]);

  // fetch all people of a selected species
  useEffect(() => {
    if (!selectedSpecie) {
      setSpeciePeople([]);
      // setSpeciePeopleDetails([]);
    } else {
      const fetchSpecieResidents = async () => {
        const residentUrls = selectedSpecie.people as string[];

        // Fetch and cache all species people
        const speciesResidentsDetails = Promise.all(
          residentUrls.map(async (url: string): Promise<IPeople> => {
            return fetchDataWithCache(url as string);
          }),
        );

        // Wait for all resident data to be fetched
        const peopleData = await speciesResidentsDetails;

        // set state to be fed to cards
        setSpeciePeople(peopleData);
      };

      fetchSpecieResidents();
    }
  }, [selectedSpecie]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <SearchPlanetsAndSpecies
        searchText={searchText}
        searchDropdown={searchSpecie}
        options={speciesOptions}
        onDropdownChange={handleSpecieChange}
        searchPrompt="Select Species..."
      ></SearchPlanetsAndSpecies>

      <div className="prose">
        <h4>
          {percentLoaded < 100
            ? `Loading Species: ${Math.round(percentLoaded)}%`
            : `Total Results: ${
                speciesPeople?.length || 0
              } | Filtered Results: ${filteredSpeciePeople?.length || 0}`}
        </h4>
      </div>

      <PeopleCards
        results={speciesPeople}
        detailedResults={filteredSpeciePeople}
      />
    </div>
  );
}
