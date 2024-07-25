import { json } from '@remix-run/node';
import { redirect, useLoaderData, useSearchParams } from '@remix-run/react';

import { usePeopleDetails } from '@/api/hooks/use-people-details';
import { PeopleCards } from '@/components/people-cards';
import { SearchPeople } from '@/components/search-people';
import { title } from '@/config.shared';

import { PaginationNav } from '../components/pagination-nav';

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import type { IPeople, PeopleApiResponse } from '../api/types';

export const meta: MetaFunction = () => {
  return [
    { title: title('Name Search') },
    { name: 'description', content: 'StarWars Search' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const searchParamsString = searchParams.toString();

  const peopleResponse = await fetch(
    `https://swapi.dev/api/people/?${searchParamsString}`,
  );
  const peopleData: PeopleApiResponse = await peopleResponse.json();

  // const peopleData = {} as PeopleApiResponse;
  return json(
    {
      peopleData,
    },
    {
      headers: {
        'Cache-Control': 'max-age=3600, public',
      },
    },
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const body = await request.formData();
  const search = body.get('search') as string;

  // update url search params based on form data
  const newSearchParams = new URLSearchParams(url.searchParams);
  newSearchParams.set('search', search || '');
  newSearchParams.set('page', 0 || '');

  return redirect(`?${newSearchParams}`);
};

export default function Index() {
  const { peopleData } = useLoaderData<typeof loader>();
  const { count, next, previous, results } = peopleData || {};

  // planet's people after homeworld and species have been resolved
  const peopleDetails = usePeopleDetails(results);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchText = searchParams.get('search') || '';
  const totalPages = Math.ceil(count / 10);

  const paginationProps = {
    currentPage,
    totalPages,
    searchParams,
    previous,
    next,
  };

  return (
    <div className="mt-4 flex flex-col gap-4 pb-8">
      <SearchPeople searchText={searchText}></SearchPeople>

      <div className="prose">
        <h4>Total Results: {count}</h4>
      </div>

      <PaginationNav {...paginationProps} />

      {results ? (
        <PeopleCards
          results={results as unknown as IPeople[]}
          detailedResults={peopleDetails}
        />
      ) : (
        'Loading...'
      )}
    </div>
  );
}
