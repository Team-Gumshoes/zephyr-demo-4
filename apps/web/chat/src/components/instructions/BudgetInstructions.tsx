import { formatDate } from '../../utils/formatDate';

interface BudgetInstructionsProps {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  budgetIncludes: string[];
  transportation: string[];
  preferences?: string;
}

const BudgetInstructions = ({
  origin,
  destination,
  departureDate,
  returnDate,
  budgetIncludes,
  transportation,
  preferences,
}: BudgetInstructionsProps) => {
  // TODO needs some clean up
  const budgetFormatted = budgetIncludes.join(', ').toLowerCase();
  const transportFormatted = transportation.join(', ').toLowerCase();
  const budgetAndTransport = transportFormatted
    ? `${budgetFormatted} and ${transportFormatted}`
    : budgetFormatted;

  return (
    <div className="text-sm">
      <div>
        Sure thing. I am happy to help you plan a trip from <strong>{origin}</strong> to{' '}
        <strong>{destination}</strong> departing on{' '}
        <strong>{formatDate(departureDate || undefined)}</strong> and returning on{' '}
        <strong>{formatDate(returnDate || undefined)}</strong> while considering{' '}
        {budgetAndTransport}
        {preferences ? (
          <span>
            {' '}
            and <strong>{preferences}</strong>.
          </span>
        ) : (
          '.'
        )}{' '}
        So that I can suggest an estimate for your flights and/or lodging, provide your preferences
        with your choices below.
      </div>
    </div>
  );
};

export default BudgetInstructions;
