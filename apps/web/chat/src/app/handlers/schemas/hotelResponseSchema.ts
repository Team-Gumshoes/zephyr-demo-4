import { z } from 'zod';

const HotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  num_of_stars: z.number(),
  price: z.number(),
});

export const HotelResponseDataSchema = z.object({
  type: z.literal('hotel'),
  summary: z.string().optional(),
  options: z.array(HotelSchema).optional(),
});
