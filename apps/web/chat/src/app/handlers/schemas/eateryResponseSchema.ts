import { z } from 'zod';

const EaterySchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  cuisine: z.string(),
});

export const EateryResponseDataSchema = z.object({
  type: z.literal('eateries'),
  summary: z.string().optional(),
  options: z.array(EaterySchema).optional(),
});
