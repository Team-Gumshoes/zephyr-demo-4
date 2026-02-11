import { BudgetPref } from '@allorai/shared-types';

const FLIGHT_PREFS: Record<BudgetPref, string> = {
  budget: 'budget-focused with possible layovers',
  balanced: 'balanced in price and convenience',
  premium: 'premium with direct flights and better times',
  none: 'none',
};

type FlightReturnInstructionsProps = {
  flightPreference?: BudgetPref;
};

const FlightReturnInstructions = ({ flightPreference }: FlightReturnInstructionsProps) => {
  if (!flightPreference) return <div>Invalid data</div>;
  return (
    <div className="text-sm">
      <div>
        Here are a few possible <b>return flights</b> that are{' '}
        <b>{FLIGHT_PREFS[flightPreference]}</b> that you can select for your trip plan estimate.
      </div>
    </div>
  );
};
export default FlightReturnInstructions;
