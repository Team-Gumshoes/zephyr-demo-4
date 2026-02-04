import { TripRequest } from '../../app/app';
import { formatDate } from '../../utils/formatDate';

interface BudgetInstructionsProps {
  tripRequest?: TripRequest | null;
}

const BudgetInstructions = ({ tripRequest }: BudgetInstructionsProps) => {
  const destination = tripRequest?.toCity || 'Paris, France';
  const origin = tripRequest?.fromCity || 'New York, NY';
  const departureDate =
    formatDate(tripRequest?.departureDate) || 'March 15, 2026';
  const returnDate = formatDate(tripRequest?.arrivalDate) || 'March 22, 2026';

  const budgetItems = tripRequest?.budgetIncludes?.length
    ? tripRequest.budgetIncludes.join(', ').toLowerCase()
    : 'flights, lodging, dining';

  const transportation = tripRequest?.transportation?.length
    ? tripRequest.transportation.join(', ').toLowerCase()
    : 'car rental';

  const considerations = tripRequest?.preferences
    ? tripRequest.preferences
    : 'family-friendly activities and local cuisine';

  const budgetAndTransport = transportation
    ? `${budgetItems} and ${transportation}`
    : budgetItems;

  return (
    <div className="text-sm">
      <div>
        Sure thing. I am happy to help you plan a trip from{' '}
        <strong>{origin}</strong> to <strong>{destination}</strong> departing on{' '}
        <strong>{departureDate}</strong> and returning on{' '}
        <strong>{returnDate}</strong> while considering {budgetAndTransport} and{' '}
        <strong>{considerations}</strong>. So that I can suggest an estimate for
        your flights and/or lodging, provide your preferences with your choices
        below.
      </div>
    </div>
  );
};

export default BudgetInstructions;
