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

const AirportInfoSchema = z
  .object({
    name: z.string(),
    iata_code: z.string(),
    latitude_deg: z.number(),
    longitude_deg: z.number(),
  })
  .optional();

const FlightSchema = z.object({
  id: z.string(),
  price: z.string(),
  currency: z.string(),
  legs: z.array(FlightLegSchema),
  date: z.string().optional(),
  destinationAirport: AirportInfoSchema,
});

export const FlightResponseDataSchema = z.object({
  type: z.literal('flight'),
  summary: z.string().optional(),
  options: z.array(FlightSchema).optional(),
});
