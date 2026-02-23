import { Activity } from './activities';
import { NaturalAttractionResponseData } from './response-data';

export interface NaturalAttraction extends Activity {
  // Any additional fields if necessary
  climate?: string;
}

export const SAMPLE_NATURAL_ATTRACTIONS: NaturalAttraction[] = [
  {
    id: 'nature-1',
    name: 'Angeles National Forest',
    description:
      'Discover over 700,000 acres of rugged wilderness just north of LA. Hike through towering pines, visit seasonal waterfalls, and spot wildlife along trails ranging from easy nature walks to challenging backcountry routes.',
    estimatedCost: '$5',
    distance: '35mi',
    category: 'Nature',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/national_park1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/national_park2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/national_park3.jpg',
    ],
  },
  {
    id: 'nature-2',
    name: 'Mount San Antonio Summit',
    description:
      'Take on the challenge of summiting Mount Baldy, the highest peak in the San Gabriel Mountains at 10,069 feet. The trail rewards hikers with sweeping views of the LA basin, desert, and on clear days, the Pacific Ocean.',
    estimatedCost: '$0',
    distance: '45mi',
    category: 'Nature',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/mountains1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/mountains2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/mountains3.jpg',
    ],
  },
  {
    id: 'nature-3',
    name: 'Echo Park Lake',
    description:
      'Rent a swan pedal boat and glide across this picturesque urban lake surrounded by palm trees and lotus flowers. The downtown skyline reflecting off the water makes for a perfect afternoon escape in the heart of the city.',
    estimatedCost: '$15',
    distance: '2mi',
    category: 'Nature',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/lake1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/lake2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/lake3.jpg',
    ],
  },
  {
    id: 'nature-4',
    name: 'El Matador State Beach',
    description:
      "Descend the blufftop staircase to discover one of Malibu's most stunning hidden beaches. Dramatic sea stacks, natural rock arches, and tide pools make this a photographer's paradise and a perfect spot for a sunset picnic.",
    estimatedCost: '$8',
    distance: '28mi',
    category: 'Nature',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/beach1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/beach2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/nature/beach3.jpg',
    ],
  },
];

export const SAMPLE_NATURE_RESPONSE: NaturalAttractionResponseData = {
  type: 'naturalAttractions',
  summary: 'sample natural attractions response summary',
  options: SAMPLE_NATURAL_ATTRACTIONS,
};
