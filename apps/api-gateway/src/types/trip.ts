export interface Trip {
  origin: string | null;
  destination: string | null;
  departureFlight: string | null;
  returnFlight: string | null;
  departureDate: string | null;
  returnDate: string | null;
  budget: number | null;
  hotel: string | null;
  interests: string[];
  constraints: string[];
}