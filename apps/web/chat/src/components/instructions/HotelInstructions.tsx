import { BudgetFormData } from '../forms/BudgetForm';

type HotelInstructionsProps = {
  budgetData: BudgetFormData | null;
};

const HotelInstructions = ({ budgetData }: HotelInstructionsProps) => {
  const getLodgingPreferenceText = () => {
    if (!budgetData?.lodgingPreference) return 'various';

    switch (budgetData.lodgingPreference) {
      case 'budget':
        return 'budget ($)';
      case 'balanced':
        return 'mid-range ($$-$$$)';
      case 'premium':
        return 'high-end ($$$-$$$$)';
      case 'none':
        return 'various';
      default:
        return 'various';
    }
  };

  return (
    <div className="text-sm">
      <div>
        Here are some lodging options in the <b>{getLodgingPreferenceText()}</b> price range that
        you can select for your trip plan estimate.
      </div>
    </div>
  );
};
export default HotelInstructions;
