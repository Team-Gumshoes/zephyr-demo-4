import type { Trip } from "../trip.js";
import type { ArithmeticResult } from "./arithmetic.types.js";
import type { FlightResults } from "./flights.types.js";
import type { HotelResults } from "./hotels.types.js";
import type { RestaurantResults } from "./restaurants.js";
import type { SelfieSpots } from "./selfieSpots.types.js";
import type { Sights } from "./sights.types.js";

export interface Message {
  type: "human" | "ai";
  content: string;
}

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

export interface ChatRequest {
  messages: Message[];
  data?: ResponseData | null;
  trip: Trip;
}

export interface ChatResponse {
  messages: Message[];
  data: ResponseData | null;
  trip: Trip;
  debug: Message[];
}
