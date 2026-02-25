import type { ArithmeticResult } from './arithmetic';
import type { Flight } from './flights';
import type { Hotel } from './hotels';
import type { Eatery } from './eateries';
import type { SelfieSpot } from './selfie-spots';
import type { Activity } from './activities';
import { NaturalAttraction } from './natural-attractions';

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

export interface EateryResponseData {
  type: 'restaurant';
  summary?: string;
  options?: Eatery[];
}

export interface SelfieResponseData {
  type: 'selfie';
  summary?: string;
  options?: SelfieSpot[];
}

export interface NaturalAttractionResponseData {
  type: 'nature';
  summary?: string;
  options?: NaturalAttraction[];
}

export interface ActivitiesResponseData {
  type: 'activities';
  summary?: string;
  options?: Activity[];
}

export type ResponseData =
  | ArithmeticResponseData
  | FlightResponseData
  | HotelResponseData
  | EateryResponseData
  | ActivitiesResponseData
  | SelfieResponseData
  | NaturalAttractionResponseData;
