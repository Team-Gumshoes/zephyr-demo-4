import { z } from 'zod';

const SelfieSpotSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
});

export const SelfieSpotResponseDataSchema = z.object({
  type: z.literal('selfieSpots'),
  summary: z.string().optional(),
  options: z.array(SelfieSpotSchema).optional(),
});
