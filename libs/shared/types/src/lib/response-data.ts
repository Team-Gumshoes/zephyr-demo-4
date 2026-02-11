import type { ArithmeticResult } from './arithmetic';
import type { FlightResults } from './flights';
import type { HotelResults } from './hotels';
import type { RestaurantResults } from './restaurants';
import type { SelfieSpots } from './selfie-spots';
import type { Sights } from './sights';

export interface ArithmeticResponseData {
  type: "arithmetic";
  summary?: string;
  options?: ArithmeticResult;
}

export interface FlightResponseData {
  type: "flight";
  summary?: string;
  options?: FlightResults[];
}

export interface HotelResponseData {
  type: "hotel";
  summary?: string;
  options?: HotelResults[];
}

export interface RestaurantResponseData {
  type: "restaurant";
  summary?: string;
  options?: RestaurantResults[];
}

export interface SelfieResponseData {
  type: "selfie";
  summary?: string;
  options?: SelfieSpots[];
}

export interface SightseeingResponseData {
  type: "sightseeing";
  summary?: string;
  options?: Sights[];
}

export type ResponseData =
  | ArithmeticResponseData
  | FlightResponseData
  | HotelResponseData
  | RestaurantResponseData
  | SelfieResponseData
  | SightseeingResponseData;
