import { z } from 'zod';

const ActivitySchema = z
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
    category: 'Activities' as const,
  }));

export const ActivityResponseDataSchema = z.object({
  type: z.literal('activities'),
  summary: z.string().optional(),
  options: z.array(ActivitySchema).optional(),
});
