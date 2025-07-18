import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiDeleteCar } from '../api';
import type { Car } from './Car';

export function useDeleteCar(setSortedCars: React.Dispatch<React.SetStateAction<Car[]>>) {
  const { mutate: deleteCar } = useMutation({
    mutationFn: apiDeleteCar,
    onSuccess: newCars => {
      toast.success('Car successfullfy deleted');
      setSortedCars(newCars);
    },
    onError: err => toast.error(err.message),
  });

  return { deleteCar };
}
