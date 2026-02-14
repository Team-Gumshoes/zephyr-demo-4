import { z } from 'zod';

const FlightSegmentSchema = z.object({
  duration: z.string(),
  departure: z.object({
    airport: z.string(),
    time: z.string(),
  }),
  arrival: z.object({
    airport: z.string(),
    time: z.string(),
  }),
  airline: z.string(),
});

const FlightLegSchema = z.object({
  direction: z.enum(['outbound', 'return']),
  legDuration: z.string(),
  segments: z.array(FlightSegmentSchema),
});

const FlightSchema = z.object({
  id: z.string(),
  price: z.number(),
  currency: z.string(),
  legs: z.array(FlightLegSchema),
});

export const FlightResponseDataSchema = z.object({
  type: z.literal('flight'),
  summary: z.string().optional(),
  options: z.array(FlightSchema).optional(),
});
