import { Dispatch, SetStateAction } from 'react';
import { Flight, Hotel, TripData, Activity, Message, TravelTip } from '@allorai/shared-types';

// This is what the handler might need to be passed to it to get its job done
export interface StepHandlerContext {
  tripData: TripData;
  chatMessages: Message[];
  setChatMessages: Dispatch<SetStateAction<Message[]>>;
  setFlightOptions: Dispatch<SetStateAction<Flight[]>>;
  // setReturningFlightOptions: Dispatch<SetStateAction<Flight[]>>;
  setHotelOptions: Dispatch<SetStateAction<Hotel[]>>;
  setActivityOptions: Dispatch<SetStateAction<Activity[]>>;
  // setNatureOptions: Dispatch<SetStateAction<NaturalAttraction[]>>;
  // setEateryOptions: Dispatch<SetStateAction<Eatery[]>>;
  // setSelfieSpotOptions: Dispatch<SetStateAction<SelfieSpot[]>>;
  setTravelTips: Dispatch<SetStateAction<TravelTip[]>>;
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
