import type { ArithmeticResult } from './arithmetic';
import type { Flight } from './flights';
import type { Hotel } from './hotels';
import type { RestaurantResults } from './restaurants';
import type { SelfieSpots } from './selfie-spots';
import type { Activity } from './activities';

export interface ArithmeticResponseData {
  type: 'arithmetic';
  summary?: string;
  options?: ArithmeticResult;
}

export interface FlightResponseData {
  type: 'flight';
  summary?: string;
  options?: Flight[];
}

export interface HotelResponseData {
  type: 'hotel';
  summary?: string;
  options?: Hotel[];
}

export interface RestaurantResponseData {
  type: 'restaurant';
  summary?: string;
  options?: RestaurantResults[];
}

export interface SelfieResponseData {
  type: 'selfie';
  summary?: string;
  options?: SelfieSpots[];
}

export interface SightseeingResponseData {
  type: 'sightseeing';
  summary?: string;
  options?: Activity[];
}

export type ResponseData =
  | ArithmeticResponseData
  | FlightResponseData
  | HotelResponseData
  | RestaurantResponseData
  | SelfieResponseData
  | SightseeingResponseData;
