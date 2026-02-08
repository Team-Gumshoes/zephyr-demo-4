import { BudgetPref } from '../forms/BudgetForm';

const HOTEL_PREFS = {
  budget: 'budget-focused ($)',
  balanced: 'balanced, mid-priced ($$-$$$)',
  premium: 'premium priced ($$$-$$$$) high-end',
  none: 'none',
};

type HotelInstructionsProps = {
  lodgingPreference: BudgetPref | undefined;
};

const HotelInstructions = ({ lodgingPreference }: HotelInstructionsProps) => {
  if (!lodgingPreference) return <div>Invalid data</div>;

  return (
    <div className="text-sm">
      <div>
        Here are some <b>{HOTEL_PREFS[lodgingPreference]}</b> lodging options
        you can select for your trip plan estimate.
      </div>
    </div>
  );
};

export default HotelInstructions;
