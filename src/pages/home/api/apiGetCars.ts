import type { Car } from '../model';

export async function apiGetCars(): Promise<Car[]> {
  try {
    const res = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Cars could not be loaded');
  }
}
