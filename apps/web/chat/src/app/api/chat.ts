import { apiClient } from '../lib/api-client';

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

export interface FlightSegment {
  duration: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  airline: string;
}

export interface FlightLeg {
  direction: "outbound" | "return";
  legDuration: string;
  segments: FlightSegment[];
}

export interface FlightResults {
  // totalDuration: string;
  price: number;
  currency: string;
  legs: FlightLeg[];
}


export interface FlightResponseData {
  type: "flight";
  summary?: string;
  options?: FlightResults[];
}

export type ResponseData =
 FlightResponseData

 export interface Message {
  type: "human" | "ai";
  content: string;
}

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

// TODO Fix the type here
export interface CreateSessionResponse {
  sessionId: string;
  createdAt: string;
}

// API sets cookie for chat_session_id
export async function createChatSession(): Promise<CreateSessionResponse> {
  const response = await apiClient.post<CreateSessionResponse>(
    '/chat/session',
    {},
  );
  return response.data;
}
/*
  export interface ChatRequest {
    messages: Message[];
    data?: ResponseData | null;
    trip: Trip;
  }

*/


export async function sendChatMessage(
  data: ChatRequest,
): Promise<ChatResponse> {
  const response = await apiClient.post<ChatResponse>(
    '/chat/message',
    data,
  );
  console.log("&&&&&&&& In chat.ts (api) &&&&&&")
  console.log(response)
  return response.data;
}
