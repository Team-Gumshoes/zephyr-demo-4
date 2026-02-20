import { z } from 'zod';

const NaturalAttractionSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
});

export const NaturalAttractionResponseDataSchema = z.object({
  type: z.literal('naturalAttractions'),
  summary: z.string().optional(),
  options: z.array(NaturalAttractionSchema).optional(),
});
