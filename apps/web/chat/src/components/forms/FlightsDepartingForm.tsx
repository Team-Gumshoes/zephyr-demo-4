import { ChatStepSequence } from '../../utils/createChatSteps';
import { formatDate } from '../../utils/formatDate';
import FlightChip, { Flight } from '../chips/FlightsChip';
import clsx from 'clsx';

export const SAMPLE_DEPARTING_FLIGHTS: Flight[] = [
  {
    id: 1,
    cost: '$ 850',
    airline: 'Air France',
    departureTime: '6:30 PM',
    arrivalTime: '8:15 AM +1',
    duration: '7 hr 45 min',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
  },
  {
    id: 2,
    cost: '$ 920',
    airline: 'Delta',
    departureTime: '10:00 PM',
    arrivalTime: '11:30 AM +1',
    duration: '7 hr 30 min',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
  },
  {
    id: 3,
    cost: '$ 780',
    airline: 'United',
    departureTime: '8:45 PM',
    arrivalTime: '10:45 AM +1',
    duration: '8 hr 00 min',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
  },
];

export type FlightsDepartingFormData = {
  flightDepartingId: number;
  departureDate: string;
  currentStepIndex: number;
};

type FlightsDepartingFormProps = FlightsDepartingFormData & {
  departingFlightOptions: Flight[];
  updateFields: (fields: Partial<FlightsDepartingFormData>) => void;
};

const FlightsDepartingForm = ({
  flightDepartingId,
  departureDate,
  currentStepIndex,
  departingFlightOptions,
  updateFields,
}: FlightsDepartingFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Departing;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">Departing Flights - {formatDate(departureDate)}</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {departingFlightOptions.map((flight) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="departingFlight"
                disabled={!isActive}
                value={flight.id}
                checked={flightDepartingId === flight.id}
                onChange={(e) => updateFields({ flightDepartingId: Number(e.target.value) })}
                className="sr-only peer"
              />
              <div
                className={clsx(
                  'peer-checked:ring-2 peer-checked:ring-[#3358ae] rounded-[20px] transition-all duration-200 ',
                  isActive && 'group-hover:scale-[1.02] group-hover:shadow-lg',
                  !isActive && flightDepartingId !== flight.id && 'hidden',
                )}
              >
                <FlightChip flight={flight} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

FlightsDepartingForm.displayName = 'FlightsDepartingForm';

export default FlightsDepartingForm;
