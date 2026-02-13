import { Dispatch, SetStateAction } from 'react';
import { FlightResults, HotelResults, TripData, Activity } from '@allorai/shared-types';

// This is what the handler might need to be passed to it to get its job done
export interface StepHandlerContext {
  tripData: TripData;
  setDepartingFlightOptions: Dispatch<SetStateAction<FlightResults[]>>;
  setReturningFlightOptions: Dispatch<SetStateAction<FlightResults[]>>;
  setHotelOptions: Dispatch<SetStateAction<HotelResults[]>>;
  setActivityOptions: Dispatch<SetStateAction<Activity[]>>;
  updateFields: (fields: Partial<TripData>) => void; // not totally clear if we need this
  next: () => void; // not totally clear if we need this
}

// This is the shape of the coming back from the handler to app.tsx
export interface StepHandlerResult {
  success: boolean; //
  error?: string; // both API error and validation error message
  shouldAdvance?: boolean; // Redundant now, but may be useful if we want more branching based on whether LLM comes back with structured output or a message?
}

// A StepHandler-type function should take the context (tripData, function to update form fields,`next` function, etc.)
export type StepHandler = (context: StepHandlerContext) => Promise<StepHandlerResult>;
