import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { TripRequest } from '../../app/app';
import { formatDate } from '../../utils/formatDate';
import FlightChip, { Flight } from '../chips/FlightsChip';

export const returnFlights: Flight[] = [
  {
    id: 4,
    cost: '$ 875',
    airline: 'Air France',
    departureTime: '10:30 AM',
    arrivalTime: '1:15 PM',
    duration: '8 hr 45 min',
    departureAirport: 'CDG',
    arrivalAirport: 'JFK',
  },
  {
    id: 5,
    cost: '$ 950',
    airline: 'Delta',
    departureTime: '1:00 PM',
    arrivalTime: '4:00 PM',
    duration: '9 hr 00 min',
    departureAirport: 'CDG',
    arrivalAirport: 'JFK',
  },
  {
    id: 6,
    cost: '$ 810',
    airline: 'United',
    departureTime: '3:45 PM',
    arrivalTime: '6:30 PM',
    duration: '8 hr 45 min',
    departureAirport: 'CDG',
    arrivalAirport: 'JFK',
  },
];

export type FlightsReturnFormData = {
  selectedFlightId: number;
};

type FlightsReturnFormProps = {
  active?: boolean;
  tripRequest?: TripRequest | null;
  onSubmit?: (data: FlightsReturnFormData) => void;
  onValidationError?: (error: string) => void;
};

export type FlightsReturnFormRef = {
  submit: () => boolean;
};

const FlightsReturnForm = forwardRef<
  FlightsReturnFormRef,
  FlightsReturnFormProps
>(({ active = true, tripRequest, onSubmit, onValidationError }, ref) => {
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const returnDate = formatDate(tripRequest?.arrivalDate) || 'March 22, 2026';

  const validateForm = () => {
    if (!selectedFlightId) {
      if (onValidationError) {
        onValidationError('Please select a return flight before continuing.');
      }
      return false;
    }
    if (onValidationError) {
      onValidationError('');
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      const isValid = validateForm();
      if (isValid) {
        formRef.current?.requestSubmit();
      }
      return isValid;
    },
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit && selectedFlightId) {
      onSubmit({ selectedFlightId });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <h2 className="text-xl font-bold my-6">Return Flights - {returnDate}</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {returnFlights.map((flight) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="returnFlight"
                value={flight.id}
                checked={selectedFlightId === flight.id}
                onChange={(e) => setSelectedFlightId(Number(e.target.value))}
                className="sr-only peer"
              />
              <div className="peer-checked:ring-2 peer-checked:ring-[#3358ae] peer-checked:ring-offset-2 rounded-[20px] transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg">
                <FlightChip flight={flight} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
});

FlightsReturnForm.displayName = 'FlightsReturnForm';

export default FlightsReturnForm;
