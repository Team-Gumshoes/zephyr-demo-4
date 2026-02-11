import { ChatStepSequence } from '../../utils/createChatSteps';
import { formatDate } from '../../utils/formatDate';
import FlightChip, { Flight } from '../chips/FlightsChip';

export const SAMPLE_RETURNING_FLIGHTS: Flight[] = [
  {
    id: "4",
    cost: '$ 875',
    airline: 'Air France',
    departureTime: '10:30 AM',
    arrivalTime: '1:15 PM',
    duration: '8 hr 45 min',
    departureAirport: 'CDG',
    arrivalAirport: 'JFK',
  },
  {
    id: "5",
    cost: '$ 950',
    airline: 'Delta',
    departureTime: '1:00 PM',
    arrivalTime: '4:00 PM',
    duration: '9 hr 00 min',
    departureAirport: 'CDG',
    arrivalAirport: 'JFK',
  },
  {
    id: "6",
    cost: '$ 810',
    airline: 'United',
    departureTime: '3:45 PM',
    arrivalTime: '6:30 PM',
    duration: '8 hr 45 min',
    departureAirport: 'CDG',
    arrivalAirport: 'JFK',
  },
];

export type FlightsReturningFormData = {
  flightReturningId?: string;
  returnDate: string | null;
  currentStepIndex: number;
};

type FlightsReturningFormProps = FlightsReturningFormData & {
  returningFlightOptions: Flight[];
  updateFields: (fields: Partial<FlightsReturningFormData>) => void;
};

const FlightsReturningForm = ({
  flightReturningId,
  returnDate,
  currentStepIndex,
  returningFlightOptions,
  updateFields,
}: FlightsReturningFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Returning;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">
        Returning Flights - {formatDate(returnDate)}
      </h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {returningFlightOptions.map((flight) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="returningFlight"
                value={flight.id}
                checked={flightReturningId === flight.id}
                disabled={!isActive}
                onChange={(e) =>
                  updateFields({ flightReturningId: e.target.value })
                }
                className="sr-only peer"
              />
              <div className="peer-checked:ring-2 peer-checked:ring-[#3358ae] peer-checked:ring-offset-2 rounded-[20px] transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg">
                <FlightChip flight={flight} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
FlightsReturningForm.displayName = 'FlightsReturnForm';

export default FlightsReturningForm;
