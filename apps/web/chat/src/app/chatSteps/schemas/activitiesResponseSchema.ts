import { z } from 'zod';

const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string().default('Default Title'),
  estimatedCost: z.string().default('Default Estimated Cost'),
  distance: z.string().default('Default Distance'),
  imageUrl: z.string().array().optional(),
  pinned: z.boolean().optional(),
  location: z.string().optional(),
  description: z.string(),
});

export const ActivityResponseDataSchema = z.object({
  type: z.literal('activities'),
  summary: z.string().optional(),
  options: z.array(ActivitySchema).optional(),
});
