import { z } from 'zod';

const NaturalAttractionSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    location: z.string().default(''),
    description: z.string().default(''),
    website: z.string().default(''),
    imageUrl: z.string().default(''),
    imageUrls: z.string().array().optional(),
    pinned: z.boolean().optional(),
    estimatedCost: z.string().default(''),
    distance: z.string().default(''),
  })
  .transform((data) => ({
    ...data,
    category: 'Nature' as const,
  }));

export const NaturalAttractionResponseDataSchema = z.object({
  type: z.literal('nature'),
  summary: z.string().optional(),
  options: z.array(NaturalAttractionSchema).optional(),
});
