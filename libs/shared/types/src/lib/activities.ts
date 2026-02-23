import { ActivitiesResponseData } from './response-data';

export const ActivityFilterTypes = ['Nature', 'Food', 'Activities', 'Selfie Spots'] as const;
export type ActivityFilterType = (typeof ActivityFilterTypes)[number];

export type Activity = {
  id: string;
  name: string;
  description: string;
  estimatedCost: string;
  distance: string;
  category: ActivityFilterType;
  imageUrl?: string[];
  pinned?: boolean;
};

export const SAMPLE_ACTIVITIES: Activity[] = [
  // Activities (4)
  {
    id: 'activities-1',
    name: 'Hollywood Bowl Concert',
    description:
      'Catch a live performance at this legendary outdoor amphitheater nestled in the Hollywood Hills. Bring a picnic and enjoy world-class music under the stars, from classical orchestras to contemporary headliners.',
    estimatedCost: '$60',
    distance: '6mi',
    category: 'Activities',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert3.jpg',
    ],
  },
  {
    id: 'activities-2',
    name: 'The Broad Museum',
    description:
      'A contemporary art museum housing nearly 2,000 works including pieces by Warhol, Basquiat, and Kusama. The striking honeycomb architecture is an attraction in itself. General admission is free with advance reservation.',
    estimatedCost: '$0',
    distance: '1.5mi',
    category: 'Activities',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum3.jpg',
    ],
  },
  {
    id: 'activities-3',
    name: 'Pacific Park at Santa Monica Pier',
    description:
      'Ride the iconic solar-powered Ferris wheel, brave the roller coaster over the ocean, and play classic carnival games on the pier. The amusement park lights up spectacularly at night with views stretching down the coastline.',
    estimatedCost: '$35',
    distance: '15mi',
    category: 'Activities',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park3.jpg',
    ],
  },
  {
    id: 'activities-4',
    name: 'Highland Park Bowl',
    description:
      'Bowl in style at this beautifully restored 1927 bowling alley featuring original hand-painted murals, craft cocktails, and wood-fired Italian food. A unique night out that blends vintage LA charm with modern entertainment.',
    estimatedCost: '$25',
    distance: '7mi',
    category: 'Activities',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling3.jpg',
    ],
  },
];

export const SAMPLE_ACTIVITIES_RESPONSE: ActivitiesResponseData = {
  type: 'activities',
  summary: 'sample activities response summary',
  options: SAMPLE_ACTIVITIES,
};
