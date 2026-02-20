import clsx from 'clsx';
import { BudgetPref } from '@allorai/shared-types';
import { ChatStepSequence } from '../../app/chatSteps/helpers/createChatSteps';

export type TravelBudgetFormData = {
  flightPreference?: BudgetPref;
  lodgingPreference?: BudgetPref;
};

export type TravelBudgetFormProps = TravelBudgetFormData & {
  updateFields: (fields: Partial<TravelBudgetFormData>) => void;
  isChatLoading: boolean;
  currentStepIndex: number;
};

const TravelBudgetForm = ({
  flightPreference,
  lodgingPreference,
  updateFields,
  currentStepIndex,
  isChatLoading,
}: TravelBudgetFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Budget;

  const flightOptions: { value: BudgetPref; label: string }[] = [
    { value: 'budget', label: 'Budget-focused (layovers likely)' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'premium', label: 'Premium (direct flights, better times)' },
    { value: 'none', label: 'No Preference' },
  ];

  const lodgingOptions: { value: BudgetPref; label: string }[] = [
    { value: 'budget', label: 'Budget ($)' },
    { value: 'balanced', label: 'Mid-Range ($$-$$$)' },
    { value: 'premium', label: 'High-End($$$-$$$$)' },
    { value: 'none', label: 'No Preference' },
  ];

  return (
    <>
      <div className="">Budget and Priorities</div>
      <div className="space-y-3 text-sm">
        <div className="font-semibold">Flight Preferences</div>
        <div className="flex flex-col">
          {flightOptions.map((option) => (
            <label
              key={option.value}
              className={clsx('flex gap-2 items-center', isActive && 'cursor-pointer')}
            >
              <input
                disabled={!isActive || isChatLoading}
                type="radio"
                name="flightPreference"
                value={option.value}
                checked={flightPreference === option.value}
                onChange={(e) =>
                  updateFields({
                    flightPreference: e.target.value as BudgetPref,
                  })
                }
                className={clsx(isActive && 'cursor-pointer')}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className="font-semibold">Lodging Preferences</div>
        <div className="flex flex-col">
          {lodgingOptions.map((option) => (
            <label
              key={option.value}
              className={clsx('flex gap-2 items-center', isActive && 'cursor-pointer')}
            >
              <input
                disabled={!isActive || isChatLoading}
                type="radio"
                name="lodgingPreference"
                value={option.value}
                checked={lodgingPreference === option.value}
                onChange={(e) =>
                  updateFields({
                    lodgingPreference: e.target.value as BudgetPref,
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

TravelBudgetForm.displayName = 'BudgetForm';

export default TravelBudgetForm;
