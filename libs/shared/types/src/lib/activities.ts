import { ActivitiesResponseData } from './response-data';

export type ActivityFilterType = 'Nature' | 'Food' | 'Activities' | 'Selfie Spots';

export type Activity = {
  id: string;
  title: string;
  description: string;
  estimatedCost: string;
  distance: string;
  category: ActivityFilterType;
  imageUrl?: string;
  pinned?: boolean;
};

export const SAMPLE_ACTIVITIES: Activity[] = [
  // Nature (4)
  {
    id: 'nature-1',
    title: 'Griffith Park Hiking Trail',
    description:
      'Explore over 4,000 acres of natural terrain with panoramic views of the LA skyline and Hollywood Sign. Perfect for a morning hike with well-marked trails for all skill levels.',
    estimatedCost: '$0',
    distance: '8mi',
    category: 'Nature',
    pinned: false,
  },
  {
    id: 'nature-2',
    title: 'Runyon Canyon Park',
    description:
      'A popular urban hiking destination with stunning views of downtown Los Angeles. The 160-acre park features multiple trail options and is dog-friendly.',
    estimatedCost: '$0',
    distance: '5mi',
    category: 'Nature',
    pinned: false,
  },
  {
    id: 'nature-3',
    title: 'Japanese Garden at The Huntington',
    description:
      'Wander through a serene Japanese garden featuring a zen court, bonsai collection, and koi pond. Part of the larger Huntington Library botanical gardens.',
    estimatedCost: '$29',
    distance: '14mi',
    category: 'Nature',
    pinned: false,
  },
  {
    id: 'nature-4',
    title: 'Malibu Creek State Park',
    description:
      'A scenic state park offering creek-side trails, rock pools, and the iconic M*A*S*H filming site. Great for a half-day escape from the city.',
    estimatedCost: '$12',
    distance: '30mi',
    category: 'Nature',
    pinned: false,
  },
  // Food (4)
  {
    id: 'food-1',
    title: 'Grand Central Market',
    description:
      'A bustling food hall in downtown LA since 1917, featuring dozens of vendors serving everything from handmade tacos to artisan coffee and Thai street food.',
    estimatedCost: '$25',
    distance: '1.2mi',
    category: 'Food',
    pinned: false,
  },
  {
    id: 'food-2',
    title: 'Somi Somi',
    description:
      'Trendy Korean dessert shop known for their Ah-Boong, a fish-shaped waffle cone filled with soft serve and customizable toppings. A must-try sweet treat.',
    estimatedCost: '$12',
    distance: '0.8mi',
    category: 'Food',
    pinned: false,
  },
  {
    id: 'food-3',
    title: 'Daikokuya Ramen',
    description:
      'Iconic Little Tokyo ramen spot famous for their rich tonkotsu broth and tender chashu pork. Expect a line, but the authentic flavors are worth the wait.',
    estimatedCost: '$18',
    distance: '0.5mi',
    category: 'Food',
    pinned: false,
  },
  {
    id: 'food-4',
    title: 'Kang Ho Dong Baekjeong',
    description:
      'Celebrity-owned Korean BBQ restaurant offering premium cuts of meat grilled tableside. The egg-coated corn cheese and soybean stew are crowd favorites.',
    estimatedCost: '$45',
    distance: '1mi',
    category: 'Food',
    pinned: false,
  },
  // Activities (4)
  {
    id: 'activities-1',
    title: 'Hollywood Bowl Concert',
    description:
      'Catch a live performance at this legendary outdoor amphitheater nestled in the Hollywood Hills. Bring a picnic and enjoy world-class music under the stars.',
    estimatedCost: '$60',
    distance: '6mi',
    category: 'Activities',
    pinned: false,
  },
  {
    id: 'activities-2',
    title: 'The Broad Museum',
    description:
      'A contemporary art museum housing nearly 2,000 works including pieces by Warhol, Basquiat, and Kusama. General admission is free with advance reservation.',
    estimatedCost: '$0',
    distance: '1.5mi',
    category: 'Activities',
    pinned: false,
  },
  {
    id: 'activities-3',
    title: 'Dodger Stadium Tour',
    description:
      "Go behind the scenes of one of baseball's most iconic stadiums. The guided tour covers the dugout, press box, and the exclusive Lexus Dugout Club.",
    estimatedCost: '$28',
    distance: '3mi',
    category: 'Activities',
    pinned: false,
  },
  {
    id: 'activities-4',
    title: 'Santa Monica Pier & Pacific Park',
    description:
      'Ride the iconic Ferris wheel, play carnival games, and stroll along the pier with ocean views. The solar-powered Ferris wheel lights up beautifully at night.',
    estimatedCost: '$35',
    distance: '15mi',
    category: 'Activities',
    pinned: false,
  },
  // Selfie Spots (4)
  {
    id: 'selfie-1',
    title: 'Urban Light at LACMA',
    description:
      "Chris Burden's iconic installation of 202 restored street lamps is one of LA's most photographed landmarks. Best visited at dusk when the lamps illuminate.",
    estimatedCost: '$0',
    distance: '4mi',
    category: 'Selfie Spots',
    pinned: false,
  },
  {
    id: 'selfie-2',
    title: 'Hollywood Sign Viewpoint',
    description:
      'Capture the perfect shot of the world-famous Hollywood Sign from the Mt. Hollywood Trail summit. The viewpoint offers an unobstructed, close-up perspective.',
    estimatedCost: '$0',
    distance: '9mi',
    category: 'Selfie Spots',
    pinned: false,
  },
  {
    id: 'selfie-3',
    title: 'Venice Beach Boardwalk',
    description:
      "Colorful murals, street performers, and Muscle Beach make this boardwalk a vibrant backdrop for photos. Don't miss the famous Venice sign at Windward Avenue.",
    estimatedCost: '$0',
    distance: '14mi',
    category: 'Selfie Spots',
    pinned: false,
  },
  {
    id: 'selfie-4',
    title: 'The Last Bookstore',
    description:
      'A stunning independent bookstore in a former bank building, featuring a book tunnel, flying book art, and a labyrinth of shelves on the second floor.',
    estimatedCost: '$0',
    distance: '1mi',
    category: 'Selfie Spots',
    pinned: false,
  },
];

export const SAMPLE_ACTIVITIES_RESPONSE: ActivitiesResponseData = {
  type: 'activities',
  summary: 'sample hotel response summary',
  options: SAMPLE_ACTIVITIES,
};
