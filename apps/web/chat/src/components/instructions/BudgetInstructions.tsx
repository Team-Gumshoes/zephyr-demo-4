import { TripRequest } from '../../app/app';

interface BudgetInstructionsProps {
  tripRequest?: TripRequest | null;
}

const BudgetInstructions = ({ tripRequest }: BudgetInstructionsProps) => {
  const destination = tripRequest?.toCity || '_________';
  const origin = tripRequest?.fromCity || '_______________';
  const departureDate = tripRequest?.departureDate || '____________';
  const returnDate = tripRequest?.arrivalDate || '____________';

  const budgetItems = tripRequest?.budgetIncludes?.length
    ? tripRequest.budgetIncludes.join(', ').toLowerCase()
    : 'flights/lodging/ground transport/dining/activities as checked';

  const transportation = tripRequest?.transportation?.length
    ? tripRequest.transportation.join(', ').toLowerCase()
    : '';

  const considerations = tripRequest?.preferences
    ? tripRequest.preferences
    : '________________________ _____________________________';

  const budgetAndTransport = transportation
    ? `${budgetItems} and ${transportation}`
    : budgetItems;

  return (
    <div className="text-sm">
      <div>
        Sure thing. I am happy to help you plan a trip to{' '}
        <strong>{destination}</strong> from <strong>{origin}</strong> departing
        on <strong>{departureDate}</strong> and returning on{' '}
        <strong>{returnDate}</strong> while considering {budgetAndTransport}
        {tripRequest?.preferences ? (
          <>
            {' '}
            and <strong>{considerations}</strong>
          </>
        ) : (
          <> and {considerations}</>
        )}
        . So that I can suggest an estimate for your flights and/or lodging,
        provide your preferences with your choices below.
      </div>
    </div>
  );
};

export default BudgetInstructions;