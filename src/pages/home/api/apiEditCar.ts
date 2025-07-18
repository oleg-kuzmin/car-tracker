import type { Car } from '../model';

export async function apiEditCar({
  id,
  editedCar,
  cars,
}: {
  id: number;
  editedCar: Car;
  cars: Car[];
}) {
  return cars.map(car => (car.id === id ? editedCar : car));
}
