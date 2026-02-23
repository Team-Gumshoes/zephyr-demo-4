import { z } from 'zod';

const EaterySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(''),
  estimatedCost: z.string().default(''),
  distance: z.string().default(''),
  category: z.enum(['Nature', 'Food', 'Activities', 'Selfie Spots']),
  imageUrl: z.string().array().optional(),
  pinned: z.boolean().optional(),
});

export const EateryResponseDataSchema = z.object({
  type: z.literal('eateries'),
  summary: z.string().optional(),
  options: z.array(EaterySchema).optional(),
});
