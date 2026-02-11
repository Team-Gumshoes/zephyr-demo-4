import { HotelResponseData } from './response-data';

export interface HotelResults {
  id: string;
  name: string;
  location: string;
  num_of_stars: number;
  price: number;
}

export const SAMPLE_HOTELS: HotelResults[] = [
  {
    id: 'a',
    name: 'The Sapphire Grand',
    location: 'Hollywood, Los Angeles',
    num_of_stars: 5,
    price: 289,
  },
  {
    id: 'b',
    name: 'Coastal Breeze Inn',
    location: 'Santa Monica, Los Angeles',
    num_of_stars: 3,
    price: 142,
  },
  {
    id: 'c',
    name: 'Velvet Palm Suites',
    location: 'Downtown, Los Angeles',
    num_of_stars: 4,
    price: 198,
  },
  {
    id: 'c',
    name: "The Wanderer's Lodge",
    location: 'Venice Beach, Los Angeles',
    num_of_stars: 2,
    price: 89,
  },
];

export const SAMPLE_HOTELS_RESPONSE: HotelResponseData = {
  type: 'hotel',
  summary: 'sample hotel response summary',
  options: SAMPLE_HOTELS,
};
