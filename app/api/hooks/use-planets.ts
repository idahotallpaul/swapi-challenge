import { useCallback, useEffect, useRef, useState } from 'react';

import { getCachedPlanets } from '../utils/planets';

import type { IPlanet } from '../types';

export function usePlanets() {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');
  const [totalResults, setTotalResults] = useState(60); // Assuming there are 60 planets in total
  const [loadedCount, setLoadedCount] = useState(0);
  const [percentLoaded, setPercentLoaded] = useState(0);

  const hasFetched = useRef(false);

  const progressCallback = useCallback(
    (count: number, planets: IPlanet[]) => {
      count !== totalResults && setTotalResults(count);
      setLoadedCount(planets.length);
      count > 0 && setPercentLoaded((planets.length / count) * 100);
    },
    [totalResults],
  );

  useEffect(() => {
    if (hasFetched.current) return;

    setStatus('loading');

    getCachedPlanets(progressCallback)
      .then((planets) => {
        setPlanets(planets);
        setLoadedCount(planets.length);
        setPercentLoaded(100); // Assuming there are 60 planets in total
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
      });

    hasFetched.current = true;
  }, [loadedCount, progressCallback]);

  return { planets, status, percentLoaded, loadedCount };
}
