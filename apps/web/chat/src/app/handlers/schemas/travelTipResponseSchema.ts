import { z } from 'zod';

const TravelTipSchema = z.object({
  id: z.string(),
  transportTips: z.string(),
  whenToVisitTips: z.string(),
  safetyTips: z.string(),
});

export const TravelTipResponseDataSchema = z.object({
  type: z.literal('travelTips'),
  summary: z.string().optional(),
  options: z.array(TravelTipSchema).optional(),
});
