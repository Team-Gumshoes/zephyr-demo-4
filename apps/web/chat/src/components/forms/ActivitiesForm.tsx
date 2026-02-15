import { useMemo, useState } from 'react';
// import { ChatStepSequence } from '../../utils/createChatSteps';
import clsx from 'clsx';
import { BudgetOverview, ActivityCard, Button } from '@allorai/shared-ui';
import { Lightbulb, Trees, UtensilsCrossed, Ticket, Camera } from 'lucide-react';
import { ActivityFilterType, Activity, Flight, Hotel } from '@allorai/shared-types';
import { calculateNights } from '../../utils/formatData';

export type ActivityFormData = {
  currentStepIndex: number;
  departureDate?: string;
  returnDate?: string;
  departureFlight?: Flight;
  returnFlight?: Flight;
  hotel?: Hotel;
};

type ActivityFormProps = ActivityFormData & {
  activityOptions: Activity[];
  updateFields: (fields: Partial<ActivityFormData>) => void;
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
}: ActivityFormProps) => {
  //   const isActive = currentStepIndex === ChatStepSequence.Activities;
  const [selectedFilter, setSelectedFilter] = useState<ActivityFilterType | null>('Nature');
  const [activities, setActivities] = useState<Activity[]>(activityOptions);

  const toggleFilter = (filter: ActivityFilterType) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter));
  };

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
      { label: 'Flights', amount: (departureFlight?.price ?? 0) + (returnFlight?.price ?? 0) },
      { label: 'Hotels', amount: (hotel?.price ?? 0) * (calculateNights(departureDate, returnDate) ?? 1) },
      { label: 'Attractions', amount: attractionsTotal },
    ];
  }, [activities, departureDate, returnDate, departureFlight, returnFlight, hotel]);

  const filteredActivities = useMemo(() => {
    const filtered = selectedFilter
      ? activities.filter((activity) => activity.category === selectedFilter)
      : activities;
    return [...filtered].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  }, [activities, selectedFilter]);

  const filters: ActivityFilterType[] = ['Nature', 'Food', 'Activities', 'Selfie Spots'];

  return (
    <div className="activities-form flex w-full gap-5 border-t-2 border-black pt-6">
      {/* Left Section */}
      <div className="flex w-[506px] shrink-0 flex-col gap-4">
        {/* Attractions and Filters */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-medium leading-7 text-black">
            Experiences Based on Your Preferences
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const Icon = FILTER_ICONS[filter];
              const isSelected = selectedFilter === filter;

              return (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={clsx(
                    'flex min-h-[32px] items-center gap-1.5 rounded-full border-2 px-3 py-1.5 transition-colors',
                    isSelected
                      ? 'border-[#52c3bf] bg-[#fbfbfe]'
                      : 'border-gray-300 bg-white hover:border-[#52c3bf]',
                  )}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="text-sm font-semibold tracking-[0.07px] text-black">
                    {filter}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Results - Activity Cards */}
        <div className="flex flex-col items-end gap-4">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              estimatedCost={activity.estimatedCost}
              distance={activity.distance}
              imageUrl={activity.imageUrl}
              pinned={activity.pinned}
              onPin={() => togglePin(activity.id)}
              onViewDetails={() => console.log('View details:', activity.id)}
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
              Save Plan
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={() => console.log('New plan')}
              className="h-10 w-full"
            >
              New Plan
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
    </div>
  );
};

ActivitiesForm.displayName = 'ActivitiesForm';

export default ActivitiesForm;
