import type { Message } from './message';
import type { ResponseData } from './response-data';
import { TripData } from './trip';

export interface ChatRequest {
  messages: Message[];
  data?: ResponseData | null;
  trip: TripData;
}

export interface ChatResponse {
  messages: Message[];
  data: ResponseData | null;
  trip: TripData;
  debug: Message[];
}
