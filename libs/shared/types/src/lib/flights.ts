import { FlightResponseData } from './response-data';

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
  direction: 'outbound' | 'return';
  legDuration: string;
  segments: FlightSegment[];
}

export interface AirportInfo {
  name: string;
  iata_code: string;
  latitude_deg: number;
  longitude_deg: number;
}

export interface CityInfo {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Flight {
  id: string;
  price: string;
  currency: string;
  legs: FlightLeg[];
  destinationAirport: AirportInfo;
  destinationCity?: CityInfo;
}

export const SAMPLE_FLIGHT_OPTIONS: Flight[] = [
  {
    id: '1',
    price: '342',
    currency: 'USD',
    legs: [
      {
        direction: 'outbound',
        legDuration: '5h 30m',
        segments: [
          {
            duration: '5h 30m',
            departure: { airport: 'JFK', time: '2025-07-15T08:00:00' },
            arrival: { airport: 'LAX', time: '2025-07-15T11:30:00' },
            airline: 'SkyBridge Airlines',
          },
        ],
      },
      {
        direction: 'return',
        legDuration: '5h 20m',
        segments: [
          {
            duration: '5h 20m',
            departure: { airport: 'LAX', time: '2025-07-22T09:00:00' },
            arrival: { airport: 'JFK', time: '2025-07-22T17:20:00' },
            airline: 'SkyBridge Airlines',
          },
        ],
      },
    ],
    destinationAirport: {
      name: 'Los Angeles International Airport',
      iata_code: 'LAX',
      latitude_deg: 33.9425,
      longitude_deg: -118.4081,
    },
    destinationCity: {
      name: 'Los Angeles',
      latitude: 34.0522,
      longitude: -118.2437,
    },
  },
  {
    id: '2',
    price: '275',
    currency: 'USD',
    legs: [
      {
        direction: 'outbound',
        legDuration: '8h 15m',
        segments: [
          {
            duration: '3h 45m',
            departure: { airport: 'JFK', time: '2025-07-15T06:30:00' },
            arrival: { airport: 'ORD', time: '2025-07-15T08:15:00' },
            airline: 'Horizon Air',
          },
          {
            duration: '4h 30m',
            departure: { airport: 'ORD', time: '2025-07-15T09:45:00' },
            arrival: { airport: 'LAX', time: '2025-07-15T12:15:00' },
            airline: 'Horizon Air',
          },
        ],
      },
      {
        direction: 'return',
        legDuration: '7h 50m',
        segments: [
          {
            duration: '3h 30m',
            departure: { airport: 'LAX', time: '2025-07-22T07:15:00' },
            arrival: { airport: 'DFW', time: '2025-07-22T12:45:00' },
            airline: 'Copper Wing',
          },
          {
            duration: '4h 20m',
            departure: { airport: 'DFW', time: '2025-07-22T14:00:00' },
            arrival: { airport: 'JFK', time: '2025-07-22T18:20:00' },
            airline: 'Copper Wing',
          },
        ],
      },
    ],
    destinationAirport: {
      name: 'Los Angeles International Airport',
      iata_code: 'LAX',
      latitude_deg: 33.9425,
      longitude_deg: -118.4081,
    },
    destinationCity: {
      name: 'Los Angeles',
      latitude: 34.0522,
      longitude: -118.2437,
    },
  },
  {
    id: '3',
    price: '410',
    currency: 'USD',
    legs: [
      {
        direction: 'outbound',
        legDuration: '5h 15m',
        segments: [
          {
            duration: '5h 15m',
            departure: { airport: 'JFK', time: '2025-07-15T14:00:00' },
            arrival: { airport: 'LAX', time: '2025-07-15T17:15:00' },
            airline: 'Crimson Pacific',
          },
        ],
      },
      {
        direction: 'return',
        legDuration: '5h 10m',
        segments: [
          {
            duration: '5h 10m',
            departure: { airport: 'LAX', time: '2025-07-22T18:30:00' },
            arrival: { airport: 'JFK', time: '2025-07-23T02:40:00' },
            airline: 'Crimson Pacific',
          },
        ],
      },
    ],
    destinationAirport: {
      name: 'Los Angeles International Airport',
      iata_code: 'LAX',
      latitude_deg: 33.9425,
      longitude_deg: -118.4081,
    },
    destinationCity: {
      name: 'Los Angeles',
      latitude: 34.0522,
      longitude: -118.2437,
    },
  },
];

export const SAMPLE_FLIGHTS_RESPONSE: FlightResponseData = {
  type: 'flight',
  summary: 'departing flight summary here',
  options: SAMPLE_FLIGHT_OPTIONS,
};
