import { z } from 'zod';

const SelfieSpotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  estimatedCost: z.string().default(''),
  distance: z.string().default(''),
  category: z.enum(['Nature', 'Food', 'Activities', 'Selfie Spots']),
  imageUrl: z.string().array().optional(),
  pinned: z.boolean().optional(),
});

export const SelfieSpotResponseDataSchema = z.object({
  type: z.literal('selfieSpots'),
  summary: z.string().optional(),
  options: z.array(SelfieSpotSchema).optional(),
});
