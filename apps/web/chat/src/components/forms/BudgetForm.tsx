import clsx from 'clsx';
import { useState, useRef, useImperativeHandle, forwardRef } from 'react';

export type BudgetFormData = {
  flightPreference: string;
  lodgingPreference: string;
};

type BudgetFormProps = {
  active?: boolean;
  onSubmit?: (data: BudgetFormData) => void;
  onValidationError?: (error: string) => void;
};

export type BudgetFormRef = {
  submit: () => boolean;
};

const BudgetForm = forwardRef<BudgetFormRef, BudgetFormProps>(
  ({ active = true, onSubmit, onValidationError }, ref) => {
    const [flightPreference, setFlightPreference] = useState('');
    const [lodgingPreference, setLodgingPreference] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const validateForm = () => {
      if (!flightPreference || !lodgingPreference) {
        if (onValidationError) {
          onValidationError(
            'Please select both flight and lodging preferences before continuing.',
          );
        }
        return false;
      }
      if (onValidationError) {
        onValidationError(''); // Clear error
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        const isValid = validateForm();
        if (isValid) {
          formRef.current?.requestSubmit();
        }
        return isValid;
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (onSubmit) {
        onSubmit({ flightPreference, lodgingPreference });
      }
    };

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="">Budget and Priorities</div>
        <div className="space-y-3 text-sm">
          <div className="font-semibold">Flight Preferences</div>
          <div className="flex flex-col">
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="flightPreference"
                value="budget"
                checked={flightPreference === 'budget'}
                onChange={(e) => setFlightPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>Budget-focused (layovers likely)</span>
            </label>
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="flightPreference"
                value="balanced"
                checked={flightPreference === 'balanced'}
                onChange={(e) => setFlightPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>Balanced</span>
            </label>
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="flightPreference"
                value="premium"
                checked={flightPreference === 'premium'}
                onChange={(e) => setFlightPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>Premium (direct flights, better times)</span>
            </label>
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="flightPreference"
                value="none"
                checked={flightPreference === 'none'}
                onChange={(e) => setFlightPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>No Preference</span>
            </label>
          </div>
          <div className="font-semibold">Lodging Preferences</div>
          <div className="flex flex-col">
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="lodgingPreference"
                value="budget"
                checked={lodgingPreference === 'budget'}
                onChange={(e) => setLodgingPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>Budget ($)</span>
            </label>
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="lodgingPreference"
                value="balanced"
                checked={lodgingPreference === 'balanced'}
                onChange={(e) => setLodgingPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>Mid-Range ($$-$$$)</span>
            </label>
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="lodgingPreference"
                value="premium"
                checked={lodgingPreference === 'premium'}
                onChange={(e) => setLodgingPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>High-End($$$-$$$$)</span>
            </label>
            <label
              className={clsx(
                'flex gap-2 items-center',
                active && 'cursor-pointer',
              )}
            >
              <input
                disabled={!active}
                type="radio"
                name="lodgingPreference"
                value="none"
                checked={lodgingPreference === 'none'}
                onChange={(e) => setLodgingPreference(e.target.value)}
                className={clsx(active && 'cursor-pointer')}
              />
              <span>No Preference</span>
            </label>
          </div>
        </div>
      </form>
    );
  },
);

BudgetForm.displayName = 'BudgetForm';

export default BudgetForm;
