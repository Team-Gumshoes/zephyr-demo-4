import { useMemo, useState } from 'react';
// import { ChatStepSequence } from '../../utils/createChatSteps';
import clsx from 'clsx';
import { BudgetOverview, ActivityCard, Button } from '@allorai/shared-ui';
import { Lightbulb, Trees, UtensilsCrossed, Ticket, Camera } from 'lucide-react';
import { Activity, Flight, Hotel } from '@allorai/shared-types';
import { calculateNights } from '../../utils/formatData';
import { Dialogue } from '@allorai/shared-ui';
import { ViewDetails } from '../modals/ViewDetails';

export const ActivityFilterTypes = ['Nature', 'Food', 'Activities', 'Selfie Spots'] as const;
export type ActivityFilterType = (typeof ActivityFilterTypes)[number];

export type ActivityFormData = {
  departureDate?: string;
  returnDate?: string;
  departureFlight?: Flight;
  returnFlight?: Flight;
  hotel?: Hotel;
};

type ActivityFormProps = ActivityFormData & {
  activityOptions: Activity[];
  updateFields: (fields: Partial<ActivityFormData>) => void;
  isChatLoading: boolean;
  currentStepIndex: number;
};

const FILTER_ICONS: Record<ActivityFilterType, React.ElementType> = {
  Nature: Trees,
  Food: UtensilsCrossed,
  Activities: Ticket,
  'Selfie Spots': Camera,
};

const parseCost = (cost: string): number => Number(cost.replace(/[^0-9.]/g, '')) || 0;

const ActivitiesForm = ({
  activityOptions,
  currentStepIndex,
  departureDate,
  returnDate,
  departureFlight,
  returnFlight,
  hotel,
  updateFields,
  isChatLoading,
}: ActivityFormProps) => {
  //   const isActive = currentStepIndex === ChatStepSequence.Activities;
  const [selectedFilter, setSelectedFilter] = useState<ActivityFilterType | null>('Nature');
  const [activities, setActivities] = useState<Activity[]>(activityOptions);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // const toggleFilter = (filter: ActivityFilterType) => {
  //   setSelectedFilter((prev) => (prev === filter ? null : filter));
  // };

  const togglePin = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId ? { ...activity, pinned: !activity.pinned } : activity,
      ),
    );
  };

  const budgetItems = useMemo(() => {
    const attractionsTotal = activities
      .filter((a) => a.pinned)
      .reduce((sum, a) => sum + parseCost(a.estimatedCost), 0);
    return [
      {
        label: 'Flights',
        amount: (Number(departureFlight?.price) ?? 0) + (Number(returnFlight?.price) ?? 0),
      },
      {
        label: 'Hotels',
        amount: (hotel?.price ?? 0) * (calculateNights(departureDate, returnDate) ?? 1),
      },
      { label: 'Attractions', amount: attractionsTotal },
    ];
  }, [activities, departureDate, returnDate, departureFlight, returnFlight, hotel]);

  // const filteredActivities = useMemo(() => {
  //   const filtered = selectedFilter
  //     ? activities.filter((activity) => activity.category === selectedFilter)
  //     : activities;
  //   // return [...filtered].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  //   return filtered;
  // }, [activities, selectedFilter]);

  // const pinnedCountByFilter = useMemo(() => {
  //   const counts: Record<ActivityFilterType, number> = {
  //     Nature: 0,
  //     Food: 0,
  //     Activities: 0,
  //     'Selfie Spots': 0,
  //   };
  //   for (const activity of activities) {
  //     if (activity.pinned) counts[activity.category]++;
  //   }
  //   return counts;
  // }, [activities]);

  const filters: ActivityFilterType[] = ['Nature', 'Food', 'Activities', 'Selfie Spots'];

  console.log(setSelectedFilter);

  return (
    <div className="activities-form flex w-full gap-5 border-t-2 border-black pt-6">
      {/* Left Section */}
      <div className="flex w-[506px] shrink-0 flex-col gap-4">
        {/* Attractions and Filters */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-medium leading-7 text-black">
            Experiences Based on Your Preferences
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-0 rounded-lg bg-[#75cfcc] p-2 w-fit">
            {filters.map((filter) => {
              const Icon = FILTER_ICONS[filter];
              const isSelected = selectedFilter === filter;
              const pinnedCount = 0; // pinnedCountByFilter[filter];

              return (
                <button
                  type="button"
                  key={filter}
                  onClick={() => {}}
                  // onClick={() => toggleFilter(filter)}
                  className={clsx(
                    'flex min-h-[32px] items-center gap-2 rounded-lg px-2.5 py-[5.5px] transition-colors',
                    isSelected ? 'bg-[#fbfbfe]' : 'hover:bg-[#75cfcc]/80',
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="text-sm font-semibold tracking-[0.07px] text-black">
                    {filter}
                  </span>
                  <span
                    className={clsx(
                      'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[12px] font-semibold leading-4 tracking-[0.18px] text-[#020617] transition-colors',
                      pinnedCount > 0 ? (isSelected ? 'bg-[#75cfcc]' : 'bg-white') : 'invisible',
                    )}
                  >
                    {pinnedCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Results - Activity Cards */}
        <div className="flex flex-col items-end gap-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              name={activity.name}
              description={activity.description}
              estimatedCost={activity.estimatedCost}
              distance={activity.distance}
              imageUrl={activity.imageUrl?.[0]}
              pinned={activity.pinned}
              onPin={() => togglePin(activity.id)}
              onViewDetails={() => setSelectedActivity(activity)}
              className="w-[505px]"
            />
          ))}

          {/* Load More Button */}
          <Button
            variant="primary"
            size="large"
            onClick={() => console.log('Load more')}
            className="h-10 w-full"
          >
            Load More
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-[273px] shrink-0 flex-col gap-10">
        {/* Budget Overview and Buttons */}
        <div className="flex flex-col gap-6">
          <BudgetOverview items={budgetItems} />

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              size="large"
              onClick={() => console.log('Save plan')}
              className="h-10 w-full"
            >
              Review & Save
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={() => console.log('New plan')}
              className="h-10 w-full"
            >
              New Trip
            </Button>
          </div>
        </div>

        {/* Travel Tips Card */}
        <div className="flex flex-col gap-3.5 rounded-[10px] border-2 border-black bg-[#fbfbfe] p-4 shadow-md">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="flex size-[30px] items-center justify-center rounded-[10px] bg-[#75cfcc] px-1.5 py-0.5">
              <Lightbulb size={18} className="text-black" />
            </div>
            <h3 className="flex-1 text-base font-semibold leading-6 text-black">Travel Tips</h3>
          </div>

          {/* Content */}
          <div className="text-xs leading-4 tracking-wide text-black">
            <p className="mb-3">
              <span className="font-semibold">Transportation:</span> The Little Tokyo/Arts District
              Station (A and E Lines) is the most convenient way to arrive, dropping you off
              directly in the heart of the neighborhood. If you must drive, the parking structures
              at Japanese Village Plaza and Weller Court are reliable, though they can be expensive
              without validation.
            </p>
            <p className="mb-3">
              <span className="font-semibold">When to Visit:</span> Weekends are bustling and offer
              a lively atmosphere, but if you want to avoid hour-long waits for ramen and udon, aim
              for a weekday lunch. August is particularly special due to the Nisei Week Japanese
              Festival, which features parades, martial arts, and cultural exhibits.
            </p>
            <p>
              <span className="font-semibold">Safety and Proximity:</span> Little Tokyo is adjacent
              to Skid Row. While the main shopping and dining areas are generally safe and
              well-trafficked, be mindful of your surroundings, especially if walking south or east
              after dark.
            </p>
          </div>
        </div>
      </div>
      {selectedActivity && (
        <Dialogue
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          title={selectedActivity.name}
          className="max-w-3xl"
        >
          <ViewDetails activity={selectedActivity} />
        </Dialogue>
      )}
    </div>
  );
};

ActivitiesForm.displayName = 'ActivitiesForm';

export default ActivitiesForm;
