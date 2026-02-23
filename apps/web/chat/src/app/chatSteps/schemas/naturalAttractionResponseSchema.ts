import { z } from 'zod';

const NaturalAttractionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  estimatedCost: z.string().default(''),
  distance: z.string().default(''),
  category: z.enum(['Nature', 'Food', 'Activities', 'Selfie Spots']),
  imageUrl: z.string().array().optional(),
  pinned: z.boolean().optional(),
});

export const NaturalAttractionResponseDataSchema = z.object({
  type: z.literal('naturalAttractions'),
  summary: z.string().optional(),
  options: z.array(NaturalAttractionSchema).optional(),
});
