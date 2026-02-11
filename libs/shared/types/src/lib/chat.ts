import type { Message } from './message';
import type { ResponseData } from './response-data';
import type { Trip } from './trip';

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
