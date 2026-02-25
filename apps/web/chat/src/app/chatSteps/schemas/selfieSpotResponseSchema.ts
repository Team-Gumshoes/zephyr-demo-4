import { z } from 'zod';

const SelfieSpotSchema = z
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
    category: 'Selfie Spots' as const,
  }));

export const SelfieSpotResponseDataSchema = z.object({
  type: z.literal('selfie'),
  summary: z.string().optional(),
  options: z.array(SelfieSpotSchema).optional(),
});
