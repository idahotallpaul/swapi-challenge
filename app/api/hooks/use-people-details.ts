import { useEffect, useState } from 'react';

import { fetchPersonDetails } from '../utils/people';

import type { IPeople } from '../types';

// fetch the linked details of each person in an array
// and return an array of and updated people objects
export function usePeopleDetails(people: IPeople[] | undefined) {
  const [peopleDetails, setPeopleDetails] = useState<IPeople[]>();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!people) return;

      const details = await Promise.all(
        people.map(async (person) => {
          const additionalData = await fetchPersonDetails(person);
          return additionalData;
        }),
      );

      setPeopleDetails(details as IPeople[]);
    };

    fetchDetails();
  }, [people]);

  return peopleDetails;
}
