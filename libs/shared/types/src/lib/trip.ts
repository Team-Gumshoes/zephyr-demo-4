// Current shape of Trip on agents api
// export interface Trip {
//   origin: string | null;
//   destination: string | null;
//   departureFlight: string | null;
//   returnFlight: string | null;
//   departureDate: string | null;
//   returnDate: string | null;
//   budget: number | null;
//   hotel: string | null;
//   interests: string[];
//   constraints: string[];
// }

import { FlightResults } from './flights';
import { HotelResults } from './hotels';

export type BudgetPref = 'budget' | 'balanced' | 'premium' | 'none';

// StartingPrefs comes from the form on the landing page (query string)
export interface StartingPrefs {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  preferences?: string;
  budgetIncludes: string[];
  transportation: string[];
}
export interface TripPrefs extends StartingPrefs {
  flightPreference?: BudgetPref;
  lodgingPreference?: BudgetPref;
  currentStepIndex: number;
  budget?: number;
  interests: string[];
  constraints: string[];
}

export interface TripData extends TripPrefs {
  departureFlight?: FlightResults;
  returnFlight?: FlightResults;
  hotel?: HotelResults;
}

// TODO AgentApiTrip is here for reference only (Delete later)
export interface AgentApiTrip {
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
  returnDate: string | null;
  budget: number | null;
  interests: string[];
  constraints: string[];

  departureFlight: string | null;
  returnFlight: string | null;
  hotel: string | null;
}

export function createEmptyTrip(): TripData {
  return {
    origin: undefined,
    destination: undefined,
    departureFlight: undefined,
    returnFlight: undefined,
    departureDate: undefined,
    returnDate: undefined,
    budget: undefined,
    hotel: undefined,
    interests: [],
    constraints: [],
    preferences: '',
    budgetIncludes: [],
    transportation: [],
    currentStepIndex: 0,
  };
}
