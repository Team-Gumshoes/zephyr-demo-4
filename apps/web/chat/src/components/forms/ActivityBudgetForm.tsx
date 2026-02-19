import clsx from 'clsx';
import { ChatStepSequence } from '../../app/lib/createChatSteps';
import { BudgetPref } from '@allorai/shared-types';

export type ActivityFormData = {
  diningPreference?: BudgetPref;
  activityPreference?: BudgetPref;
};

export type ActivityFormProps = ActivityFormData & {
  updateFields: (fields: Partial<ActivityFormData>) => void;
  currentStepIndex: number;
  isChatLoading: boolean;
};

const ActivityBudgetForm = ({
  diningPreference,
  activityPreference,
  updateFields,
  currentStepIndex,
  isChatLoading,
}: ActivityFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.ActivityBudget;

  const DiningOptions: { value: BudgetPref; label: string }[] = [
    { value: 'budget', label: 'Budget-friendly ($)' },
    { value: 'balanced', label: 'Mid-Range ($$-$$$)' },
    { value: 'premium', label: 'Fine Dining ($$$-$$$$)' },
    { value: 'none', label: 'No Preference' },
  ];

  const activityOptions: { value: BudgetPref; label: string }[] = [
    { value: 'budget', label: 'Budget-friendly ($)' },
    { value: 'balanced', label: 'Mid-Range ($$-$$$)' },
    { value: 'premium', label: 'Premium Experiences ($$$-$$$$)' },
    { value: 'none', label: 'No Preference' },
  ];

  return (
    <>
      <div className="">Budget and Priorities</div>
      <div className="space-y-3 text-sm">
        <div className="font-semibold">Dining Preferences</div>
        <div className="flex flex-col">
          {DiningOptions.map((option) => (
            <label
              key={option.value}
              className={clsx('flex gap-2 items-center', isActive && 'cursor-pointer')}
            >
              <input
                disabled={!isActive || isChatLoading}
                type="radio"
                name="diningPreference"
                value={option.value}
                checked={diningPreference === option.value}
                onChange={(e) =>
                  updateFields({
                    diningPreference: e.target.value as BudgetPref,
                  })
                }
                className={clsx(isActive && 'cursor-pointer')}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className="font-semibold">Activity Preferences</div>
        <div className="flex flex-col">
          {activityOptions.map((option) => (
            <label
              key={option.value}
              className={clsx('flex gap-2 items-center', isActive && 'cursor-pointer')}
            >
              <input
                disabled={!isActive || isChatLoading}
                type="radio"
                name="activityPreference"
                value={option.value}
                checked={activityPreference === option.value}
                onChange={(e) =>
                  updateFields({
                    activityPreference: e.target.value as BudgetPref,
                  })
                }
                className={clsx(isActive && 'cursor-pointer')}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

ActivityBudgetForm.displayName = 'BudgetForm';

export default ActivityBudgetForm;
