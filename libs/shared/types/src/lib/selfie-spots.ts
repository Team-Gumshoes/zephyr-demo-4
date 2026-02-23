import { Activity } from './activities';
import { SelfieResponseData } from './response-data';

export interface SelfieSpot extends Activity {
  // Any additional fields if necessary
  rating?: string;
}

export const SAMPLE_SELIFE_SPOTS: SelfieSpot[] = [
  {
    id: 'selfie-1',
    name: 'Hachiko Dog Statue at Little Tokyo',
    description:
      "Snap a photo with the bronze statue of Hachiko, Japan's most loyal dog, located in the heart of Little Tokyo. The statue is a popular meeting point and a tribute to the famous Akita's unwavering devotion.",
    estimatedCost: '$0',
    distance: '0.5mi',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue3.jpg',
    ],
  },
  {
    id: 'selfie-2',
    name: 'Urban Light at LACMA',
    description:
      "Pose among 202 restored vintage street lamps in Chris Burden's iconic installation outside the Los Angeles County Museum of Art. Best visited at dusk when the lamps illuminate against the twilight sky for a magical photo backdrop.",
    estimatedCost: '$0',
    distance: '4mi',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights3.jpg',
    ],
  },
  {
    id: 'selfie-3',
    name: 'Arts District Murals',
    description:
      "Wander through LA's vibrant Arts District where every alley and building wall is a canvas. Massive, colorful murals by world-renowned street artists create an ever-changing open-air gallery perfect for eye-catching photos.",
    estimatedCost: '$0',
    distance: '1mi',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural3.jpg',
    ],
  },
  {
    id: 'selfie-4',
    name: 'Griffith Observatory',
    description:
      'Stand on the terrace of this Art Deco landmark perched on the slopes of Mount Hollywood for sweeping panoramic views of the LA skyline, the Hollywood Sign, and the Pacific Ocean. Free admission makes it a must-visit.',
    estimatedCost: '$0',
    distance: '8mi',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory3.jpg',
    ],
  },
];

export const SAMPLE_SELFIE_SPOTS_RESPONSE: SelfieResponseData = {
  type: 'selfieSpots',
  summary: 'sample selfie spots response summary',
  options: SAMPLE_SELIFE_SPOTS,
};
