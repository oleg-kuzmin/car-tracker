import type { Car } from '../model';

export async function apiDeleteCar({ id, cars }: { id: number; cars: Car[] }) {
  return cars.filter(car => car.id !== id);
}
