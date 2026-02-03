import { BudgetFormData } from '../forms/BudgetForm';

type FlightReturnInstructionsProps = {
  budgetData: BudgetFormData | null;
};

const FlightReturnInstructions = ({
  budgetData,
}: FlightReturnInstructionsProps) => {
  const getFlightPreferenceText = () => {
    if (!budgetData?.flightPreference) return 'available';

    switch (budgetData.flightPreference) {
      case 'budget':
        return 'budget-focused with possible layovers';
      case 'balanced':
        return 'balanced in price and convenience';
      case 'premium':
        return 'premium with direct flights and better times';
      case 'none':
        return 'available';
      default:
        return 'available';
    }
  };

  return (
    <div className="text-sm">
      <div>
        Here are a few possible <b>return</b> flights that are{' '}
        <b>{getFlightPreferenceText()}</b> that you can select for your trip
        plan estimate.
      </div>
    </div>
  );
};
export default FlightReturnInstructions;
