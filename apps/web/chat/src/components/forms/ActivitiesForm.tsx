import { useState } from 'react';
// import { ChatStepSequence } from '../../utils/createChatSteps';
import clsx from 'clsx';
import { BudgetOverview, ActivityCard, Button } from '@allorai/shared-ui';
import { Lightbulb, UtensilsCrossed, Ticket, Camera } from 'lucide-react';
import { ActivityFilterType, Activity } from '@allorai/shared-types';

export type ActivityFormData = {
  currentStepIndex: number;
};

type ActivityFormProps = ActivityFormData & {
  activityOptions: Activity[];
  updateFields: (fields: Partial<ActivityFormData>) => void;
};

const FILTER_ICONS: Record<ActivityFilterType, React.ElementType> = {
  Food: UtensilsCrossed,
  Activities: Ticket,
  'Selfie Spots': Camera,
};

const BUDGET_ITEMS = [
  { label: 'Flights', amount: 800 },
  { label: 'Hotels', amount: 600 },
  { label: 'Attractions', amount: 0 },
];

const ActivitiesForm = ({ activityOptions, currentStepIndex, updateFields }: ActivityFormProps) => {
  //   const isActive = currentStepIndex === ChatStepSequence.Activities;
  const [selectedFilters, setSelectedFilters] = useState<Set<ActivityFilterType>>(new Set());
  const [activities, setActivities] = useState<Activity[]>(activityOptions);

  const toggleFilter = (filter: ActivityFilterType) => {
    setSelectedFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const togglePin = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId ? { ...activity, pinned: !activity.pinned } : activity,
      ),
    );
  };

  const filters: ActivityFilterType[] = ['Food', 'Activities', 'Selfie Spots'];

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
              const isSelected = selectedFilters.has(filter);

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
          {activities.map((activity) => (
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
          <BudgetOverview items={BUDGET_ITEMS} />

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
