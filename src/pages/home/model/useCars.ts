import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiGetCars } from '../api';
import type { Car } from './Car';

export function useCars() {
  const [sortedCars, setSortedCars] = useState<Car[]>([]);
  const [searchParams] = useSearchParams();
  const sortByRaw = searchParams.get('sortBy') || 'year-descending';

  const {
    isPending,
    data: cars,
    error,
  } = useQuery({
    queryKey: ['cars'],
    queryFn: apiGetCars,
    enabled: sortedCars.length === 0,
  });

  useEffect(() => {
    const newCars = cars ?? [];
    setSortedCars(newCars);
  }, [cars, setSortedCars]);

  useEffect(() => {
    switch (sortByRaw) {
      case 'year-descending':
        setSortedCars(sortedCards => [...sortedCards].sort((a, b) => b.year - a.year));
        break;
      case 'year-ascending':
        setSortedCars(sortedCards => [...sortedCards].sort((a, b) => a.year - b.year));
        break;
      case 'price-descending':
        setSortedCars(sortedCards => [...sortedCards].sort((a, b) => b.price - a.price));
        break;
      case 'price-ascending':
        setSortedCars(sortedCards => [...sortedCards].sort((a, b) => a.price - b.price));
        break;
    }
  }, [sortByRaw]);

  return { isLoadingCars: isPending, errorLoadingCars: error, sortedCars, setSortedCars };
}
