import type { Car } from '../model';

export async function apiGetCars(): Promise<Car[]> {
  try {
    const res = await fetch('https://6732ff9a2a1b1a4ae111a3bd.mockapi.io/api/car-tracker');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Cars could not be loaded');
  }
}
