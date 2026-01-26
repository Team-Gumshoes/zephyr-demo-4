import clsx from 'clsx';

const BudgetForm = ({ active = false }: { active?: Boolean }) => {
  return (
    <form>
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
              className={clsx(active && 'cursor-pointer')}
            />
            <span>Premium (direct flights, better times)</span>
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
              className={clsx(active && 'cursor-pointer')}
            />
            <span>High-End($$$-$$$$)</span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
