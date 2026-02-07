import { formatDate } from '../../utils/formatDate';

interface BudgetInstructionsProps {
  toCity: string;
  fromCity: string;
  departureDate: string;
  returnDate: string;
  budgetIncludes: string[];
  transportation: string[];
  preferences?: string;
}

const BudgetInstructions = ({
  toCity,
  fromCity,
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
        Sure thing. I am happy to help you plan a trip from{' '}
        <strong>{fromCity}</strong> to <strong>{toCity}</strong> departing on{' '}
        <strong>{formatDate(departureDate)}</strong> and returning on{' '}
        <strong>{formatDate(returnDate)}</strong> while considering {budgetAndTransport}
        { preferences ? <span> and <strong>{preferences}</strong>.</span> : "."}{' '}
        So that I can suggest an estimate{' '}
        for your flights and/or lodging, provide your preferences with your
        choices below.
      </div>
    </div>
  );
};

export default BudgetInstructions;
