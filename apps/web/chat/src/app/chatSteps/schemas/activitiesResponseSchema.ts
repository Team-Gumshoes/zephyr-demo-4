import { z } from 'zod';

const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(''),
  estimatedCost: z.string().default(''),
  distance: z.string().default(''),
  category: z.enum(['Nature', 'Food', 'Activities', 'Selfie Spots']),
  imageUrl: z.string().array().optional(),
  pinned: z.boolean().optional(),
});

export const ActivityResponseDataSchema = z.object({
  type: z.literal('activities'),
  summary: z.string().optional(),
  options: z.array(ActivitySchema).optional(),
});
