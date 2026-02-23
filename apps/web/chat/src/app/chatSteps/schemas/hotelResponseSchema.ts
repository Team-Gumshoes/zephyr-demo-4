import { z } from 'zod';

const HotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  rating: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  description: z.string(),
  website: z.string(),
  num_of_stars: z.number().optional(),
  price: z.number().optional(),
});

export const HotelResponseDataSchema = z.object({
  type: z.literal('hotel'),
  summary: z.string().optional(),
  options: z.array(HotelSchema).optional(),
});
