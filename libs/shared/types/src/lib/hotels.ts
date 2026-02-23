import { HotelResponseData } from './response-data';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
  description: string;
  website: string;
  num_of_stars?: number;
  price?: number;
}

export const SAMPLE_HOTELS: Hotel[] = [
  {
    id: 'a',
    name: 'The Sapphire Grand',
    location: 'Hollywood, Los Angeles',
    description:
      'A luxurious five-star hotel in the heart of Hollywood with world-class amenities.',
    website: 'https://www.sapphiregrand.com',
    num_of_stars: 5,
    price: 289,
  },
  {
    id: 'b',
    name: 'Coastal Breeze Inn',
    location: 'Santa Monica, Los Angeles',
    description: 'A charming beachside inn offering comfortable stays near the Santa Monica Pier.',
    website: 'https://www.coastalbreezeinn.com',
    num_of_stars: 3,
    price: 142,
  },
  {
    id: 'c',
    name: 'Velvet Palm Suites',
    location: 'Downtown, Los Angeles',
    description:
      'Modern upscale suites in downtown LA with stunning city views and premium services.',
    website: 'https://www.velvetpalmsuites.com',
    num_of_stars: 4,
    price: 198,
  },
  {
    id: 'd',
    name: "The Wanderer's Lodge",
    location: 'Venice Beach, Los Angeles',
    description: 'A budget-friendly lodge steps away from the iconic Venice Beach boardwalk.',
    website: 'https://www.wandererslodge.com',
    num_of_stars: 2,
    price: 89,
  },
];

export const SAMPLE_HOTELS_RESPONSE: HotelResponseData = {
  type: 'hotel',
  summary: 'sample hotel response summary',
  options: SAMPLE_HOTELS,
};
