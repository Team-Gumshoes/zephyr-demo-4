import { Activity } from './activities';
import { EateryResponseData } from './response-data';

export interface Eatery extends Activity {
  // Any additional fields if necessary
  cuisine?: string;
}

export const SAMPLE_RESTAURANTS: Eatery[] = [
  {
    id: 'food-1',
    name: "Bludso's BBQ",
    description:
      'Texas-style barbecue that has earned a cult following in LA. Pitmaster Kevin Bludso slow-smokes brisket, ribs, and hot links over oak wood for hours, delivering tender, smoky perfection with every bite.',
    estimatedCost: '30',
    distance: '4mi',
    location: 'Hollywood',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
    'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq3.jpg',
    ],
  },
  {
    id: 'food-2',
    name: "Irv's Burgers",
    description:
      'A beloved LA burger stand serving smash-style burgers with crispy edges and juicy centers since the 1940s. The no-frills menu focuses on what matters — quality beef, melted cheese, and perfectly toasted buns.',
    estimatedCost: '15',
    distance: '3mi',
    location: 'Hollywood',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
    'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger3.jpg',
    ],
  },
  {
    id: 'food-3',
    name: 'Daikokuya Ramen',
    description:
      'Iconic Little Tokyo ramen spot famous for their rich tonkotsu broth simmered for over 20 hours and tender chashu pork. Expect a line out the door, but the authentic flavors and generous portions are worth the wait.',
    estimatedCost: '18',
    distance: '0.5mi',
    location: 'Hollywood',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
    'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen3.jpg',
    ],
  },
  {
    id: 'food-4',
    name: 'Matcha-Do Taiyaki',
    description:
      'Freshly pressed fish-shaped waffle cones filled with creamy soft serve, sweet red bean paste, or rich matcha custard. This Japanese street food favorite is as fun to photograph as it is to eat.',
    estimatedCost: '10',
    distance: '0.8mi',
    location: 'Hollywood',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
    'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki3.jpg',
    ],
  },
];

export const SAMPLE_RESTAURANTS_RESPONSE: EateryResponseData = {
  type: 'restaurant',
  summary: 'sample food and eatery response summary',
  options: SAMPLE_RESTAURANTS,
};
