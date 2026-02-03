import { BudgetFormData } from '../forms/BudgetForm';

type FlightDepartingInstructionsProps = {
  budgetData: BudgetFormData | null;
};

const FlightDepartingInstructions = ({
  budgetData,
}: FlightDepartingInstructionsProps) => {
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
        Thank you for your preferences. Here are a few possible <b>departing</b>{' '}
        flights that are <b>{getFlightPreferenceText()}</b> that you can select
        for your trip plan estimate.
      </div>
    </div>
  );
};
export default FlightDepartingInstructions;
