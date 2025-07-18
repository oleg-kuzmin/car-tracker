import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiEditCar } from '../api';
import type { Car } from './Car';

export function useEditCar(setSortedCars: React.Dispatch<React.SetStateAction<Car[]>>) {
  const { mutate: editCar } = useMutation({
    mutationFn: apiEditCar,
    onSuccess: newCars => {
      toast.success('Car successfullfy edited');
      setSortedCars(newCars);
    },
    onError: err => toast.error(err.message),
  });

  return { editCar };
}
