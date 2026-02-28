import { z } from 'zod';

// Accepts number | null | undefined from the API and normalises null → undefined,
// keeping the output type as number | undefined to match the Hotel interface.
const nullableOptionalNumber = z
  .number()
  .nullable()
  .optional()
  .transform((v) => v ?? undefined);

// Accepts string | null | undefined from the API and normalises null → undefined,
// keeping the output type as string | undefined to match the Hotel interface.
const nullableOptionalString = z
  .string()
  .nullable()
  .optional()
  .transform((v) => v ?? undefined);

const HotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  rating: nullableOptionalNumber,
  latitude: nullableOptionalNumber,
  longitude: nullableOptionalNumber,
  description: z.string(),
  website: z.string(),
  num_of_stars: nullableOptionalNumber,
  price: nullableOptionalNumber,
  imageUrl: nullableOptionalString,
});

export const HotelResponseDataSchema = z.object({
  type: z.literal('hotel'),
  summary: z.string().optional(),
  options: z.array(HotelSchema).optional(),
});
