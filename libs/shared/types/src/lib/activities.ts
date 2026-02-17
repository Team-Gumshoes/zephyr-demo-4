import { ActivitiesResponseData } from './response-data';

export type ActivityFilterType = 'Nature' | 'Food' | 'Activities' | 'Selfie Spots';

export type Activity = {
  id: string;
  title: string;
  description: string;
  estimatedCost: string;
  distance: string;
  category: ActivityFilterType;
  imageUrl?: string[];
  pinned?: boolean;
};

export const SAMPLE_ACTIVITIES: Activity[] = [
  // Nature (4)
  {
    id: 'nature-1',
    title: 'Angeles National Forest',
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
    title: 'Mount San Antonio Summit',
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
    title: 'Echo Park Lake',
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
    title: 'El Matador State Beach',
    description:
      'Descend the blufftop staircase to discover one of Malibu\'s most stunning hidden beaches. Dramatic sea stacks, natural rock arches, and tide pools make this a photographer\'s paradise and a perfect spot for a sunset picnic.',
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
  // Food (4)
  {
    id: 'food-1',
    title: 'Bludso\'s BBQ',
    description:
      'Texas-style barbecue that has earned a cult following in LA. Pitmaster Kevin Bludso slow-smokes brisket, ribs, and hot links over oak wood for hours, delivering tender, smoky perfection with every bite.',
    estimatedCost: '$30',
    distance: '4mi',
    category: 'Food',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq3.jpg',
    ],
  },
  {
    id: 'food-2',
    title: 'Irv\'s Burgers',
    description:
      'A beloved LA burger stand serving smash-style burgers with crispy edges and juicy centers since the 1940s. The no-frills menu focuses on what matters — quality beef, melted cheese, and perfectly toasted buns.',
    estimatedCost: '$15',
    distance: '3mi',
    category: 'Food',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger3.jpg',
    ],
  },
  {
    id: 'food-3',
    title: 'Daikokuya Ramen',
    description:
      'Iconic Little Tokyo ramen spot famous for their rich tonkotsu broth simmered for over 20 hours and tender chashu pork. Expect a line out the door, but the authentic flavors and generous portions are worth the wait.',
    estimatedCost: '$18',
    distance: '0.5mi',
    category: 'Food',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen3.jpg',
    ],
  },
  {
    id: 'food-4',
    title: 'Matcha-Do Taiyaki',
    description:
      'Freshly pressed fish-shaped waffle cones filled with creamy soft serve, sweet red bean paste, or rich matcha custard. This Japanese street food favorite is as fun to photograph as it is to eat.',
    estimatedCost: '$10',
    distance: '0.8mi',
    category: 'Food',
    pinned: false,
    imageUrl: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki3.jpg',
    ],
  },
  // Activities (4)
  {
    id: 'activities-1',
    title: 'Hollywood Bowl Concert',
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
    title: 'The Broad Museum',
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
    title: 'Pacific Park at Santa Monica Pier',
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
    title: 'Highland Park Bowl',
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
  // Selfie Spots (4)
  {
    id: 'selfie-1',
    title: 'Hachiko Dog Statue at Little Tokyo',
    description:
      'Snap a photo with the bronze statue of Hachiko, Japan\'s most loyal dog, located in the heart of Little Tokyo. The statue is a popular meeting point and a tribute to the famous Akita\'s unwavering devotion.',
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
    title: 'Urban Light at LACMA',
    description:
      'Pose among 202 restored vintage street lamps in Chris Burden\'s iconic installation outside the Los Angeles County Museum of Art. Best visited at dusk when the lamps illuminate against the twilight sky for a magical photo backdrop.',
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
    title: 'Arts District Murals',
    description:
      'Wander through LA\'s vibrant Arts District where every alley and building wall is a canvas. Massive, colorful murals by world-renowned street artists create an ever-changing open-air gallery perfect for eye-catching photos.',
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
    title: 'Griffith Observatory',
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

export const SAMPLE_ACTIVITIES_RESPONSE: ActivitiesResponseData = {
  type: 'activities',
  summary: 'sample hotel response summary',
  options: SAMPLE_ACTIVITIES,
};
