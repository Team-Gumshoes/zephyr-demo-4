// import { BaseAgentResponse, BaseAgentRequest } from './base.types';

// export interface Flight {
//   flightNumber: number;
//   airline: string;
//   price: number;
//   departure: string;
//   arrival: string;
//   duration: number;
// }

// export interface FlightsData {
//   flights: Flight[];
//   searchCriteria?: {
//     origin: string;
//     destination: string;
//     date: string;
//   };
// }

// export interface FlightAgentResponse extends BaseAgentResponse<FlightsData> {}

// export interface FlightAgentRequest extends BaseAgentRequest {
//   searchParams?: {
//     maxPrice?: number;
//     preferredAirlines?: string[];
//   };
// }


// export interface FlightSegment {
//   duration: string;
//   departure: {
//     airport: string;
//     time: string;
//   };
//   arrival: {
//     airport: string;
//     time: string;
//   };
//   airline: string;
// }

// export interface FlightLeg {
//   direction: "outbound" | "return";
//   legDuration: string;
//   segments: FlightSegment[];
// }

// export interface FlightResults {
//   // totalDuration: string;
//   price: number;
//   currency: string;
//   legs: FlightLeg[];
// }



// /*
//   export type FlightAgentResponse = {
//     messages: { type: string; content: string }[];
//     data: { flights: [{flightNumber: number, airline: string, price: number}]};
//     trip: {};
//     debug: {}[];
//   };
// */