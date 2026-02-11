// import { BaseAgentResponse, BaseAgentRequest } from './base.types';


export type ChatAgentResponse = {
  messages: { type: string; content: string }[];
  data: {};
  trip: {};
  debug: {}[];
};

/*
export interface Flight {
  flightNumber: number;
  airline: string;
  price: number;
  departure: string;
  arrival: string;
  duration: number;
}

export interface FlightsData {
  flights: Flight[];
  searchCriteria?: {
    origin: string;
    destination: string;
    date: string;
  };
}

export interface FlightAgentResponse extends BaseAgentResponse<FlightsData> {}

export interface FlightAgentRequest extends BaseAgentRequest {
  searchParams?: {
    maxPrice?: number;
    preferredAirlines?: string[];
  };
}

  export type FlightAgentResponse = {
    messages: { type: string; content: string }[];
    data: { flights: [{flightNumber: number, airline: string, price: number}]};
    trip: {};
    debug: {}[];
  };
*/