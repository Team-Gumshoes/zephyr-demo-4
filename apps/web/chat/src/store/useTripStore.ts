import { create } from 'zustand';
import {
  createEmptyTrip,
  TripData,
  Flight,
  Hotel,
  Activity,
  TravelTips,
} from '@allorai/shared-types';

interface TripStore {
  tripData: TripData;
  flightOptions: Flight[];
  hotelOptions: Hotel[];
  activityOptions: Activity[];
  travelTips: TravelTips[];

  updateTripData: (fields: Partial<TripData>) => void;
  setFlightOptions: (updater: Flight[] | ((prev: Flight[]) => Flight[])) => void;
  setHotelOptions: (updater: Hotel[] | ((prev: Hotel[]) => Hotel[])) => void;
  setActivityOptions: (updater: Activity[] | ((prev: Activity[]) => Activity[])) => void;
  setTravelTips: (updater: TravelTips[] | ((prev: TravelTips[]) => TravelTips[])) => void;
  togglePin: (activityId: string) => void;
}

const resolve = <T>(updater: T | ((prev: T) => T), prev: T): T =>
  typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater;

export const useTripStore = create<TripStore>((set) => ({
  tripData: createEmptyTrip(),
  flightOptions: [],
  hotelOptions: [],
  activityOptions: [],
  travelTips: [],

  updateTripData: (fields) =>
    set((s) => ({ tripData: { ...s.tripData, ...fields } })),

  setFlightOptions: (updater) =>
    set((s) => ({ flightOptions: resolve(updater, s.flightOptions) })),

  setHotelOptions: (updater) =>
    set((s) => ({ hotelOptions: resolve(updater, s.hotelOptions) })),

  setActivityOptions: (updater) =>
    set((s) => ({ activityOptions: resolve(updater, s.activityOptions) })),

  setTravelTips: (updater) =>
    set((s) => ({ travelTips: resolve(updater, s.travelTips) })),

  togglePin: (activityId) =>
    set((s) => ({
      activityOptions: s.activityOptions.map((a) =>
        a.id === activityId ? { ...a, pinned: !a.pinned } : a,
      ),
    })),
}));
