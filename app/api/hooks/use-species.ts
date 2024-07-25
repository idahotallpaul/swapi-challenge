import { useCallback, useEffect, useRef, useState } from 'react';

import { getCachedSpecies } from '../utils/species';

import type { ISpecie } from '../types';

export function useSpecies() {
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');
  const [totalResults, setTotalResults] = useState(100);
  const [loadedCount, setLoadedCount] = useState(0);
  const [percentLoaded, setPercentLoaded] = useState(0);

  const hasFetched = useRef(false);

  const progressCallback = useCallback(
    (count: number, species: ISpecie[]) => {
      count !== totalResults && setTotalResults(count);
      setLoadedCount(species.length);
      count > 0 && setPercentLoaded((species.length / count) * 100); // Assuming there are 60 species in total
    },
    [totalResults],
  );

  useEffect(() => {
    if (hasFetched.current) return;

    setStatus('loading');

    getCachedSpecies(progressCallback)
      .then((species) => {
        setSpecies(species);
        setLoadedCount(species.length);
        setPercentLoaded(100); // Assuming there are 60 species in total
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
      });

    hasFetched.current = true;
  }, [loadedCount, progressCallback]);

  return { species, status, percentLoaded, loadedCount };
}
