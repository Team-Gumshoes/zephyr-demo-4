import { TripRequest } from "../types/chat.types";

export default function parseTripRequest(searchParams: URLSearchParams): TripRequest | null {
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');

  if (!fromCity || !toCity) {
    return null;
  }

  return {
    fromCity,
    toCity,
    departureDate: searchParams.get('departureDate') || '',
    arrivalDate: searchParams.get('arrivalDate') || '',
    budgetIncludes:
      searchParams.get('budgetIncludes')?.split(',').filter(Boolean) || [],
    transportation:
      searchParams.get('transportation')?.split(',').filter(Boolean) || [],
    preferences: searchParams.get('preferences') || undefined,
  };
}