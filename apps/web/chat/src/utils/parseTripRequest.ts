export interface TripRequest {
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate: string;
  budgetIncludes: string[];
  transportation: string[];
  preferences?: string;
}

export const fallbackTripRequest = {
  fromCity: 'Paris, France',
  toCity: 'New York, NY',
  departureDate: 'March 15, 2026',
  returnDate: 'March 22, 2026',
  budgetIncludes: ['flights', 'lodging', 'dining'],
  transportation: ['car rental'],
  preferences: 'family-friendly activities and local cuisine',
};

export default function parseTripRequest(
  searchParams: URLSearchParams,
): TripRequest | null {
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const budgetIncludes =
    searchParams.get('budgetIncludes')?.split(',').filter(Boolean) || [];
  const transportation =
    searchParams.get('transportation')?.split(',').filter(Boolean) || [];

  if (
    !fromCity ||
    !toCity ||
    !departureDate ||
    !returnDate ||
    budgetIncludes.length < 1 ||
    transportation.length < 1
  ) {
    return fallbackTripRequest; // TODO <-- This is temporary only for development, should return null
    // return null;
  }

  return {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    budgetIncludes,
    transportation,
    preferences: searchParams.get('preferences') || undefined,
  };
}
