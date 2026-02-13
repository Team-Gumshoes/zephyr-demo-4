export type ActivityFilterType = 'Food' | 'Activities' | 'Selfie Spots';

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
  {
    id: '1',
    title: 'Concert',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    estimatedCost: '$600',
    distance: '3mi',
    category: 'Activities',
    pinned: true,
  },
  {
    id: '2',
    title: 'Somi Somi',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    estimatedCost: '$10',
    distance: '1mi',
    category: 'Food',
    pinned: false,
  },
  {
    id: '3',
    title: 'National Park',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    estimatedCost: '$30',
    distance: '12mi',
    category: 'Activities',
    pinned: false,
  },
  {
    id: '4',
    title: 'Dog Statue',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    estimatedCost: '$0',
    distance: '2.4mi',
    category: 'Selfie Spots',
    pinned: false,
  },
];
