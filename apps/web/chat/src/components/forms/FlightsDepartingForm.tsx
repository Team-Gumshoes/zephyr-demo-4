import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { TripRequest } from '../../app/app';
import { formatDate } from '../../utils/formatDate';
import FlightChip, { Flight } from '../chips/FlightsChip';

export const departingFlights: Flight[] = [
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
  selectedFlightId: number;
};

type FlightsDepartingFormProps = {
  active?: boolean;
  tripRequest?: TripRequest | null;
  onSubmit?: (data: FlightsDepartingFormData) => void;
  onValidationError?: (error: string) => void;
};

export type FlightsDepartingFormRef = {
  submit: () => boolean;
};

const FlightsDepartingForm = forwardRef<
  FlightsDepartingFormRef,
  FlightsDepartingFormProps
>(({ active = true, tripRequest, onSubmit, onValidationError }, ref) => {
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const departureDate =
    formatDate(tripRequest?.departureDate) || 'March 15, 2026';

  const validateForm = () => {
    if (!selectedFlightId) {
      if (onValidationError) {
        onValidationError('Please select a departing flight before continuing.');
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
      <h2 className="text-xl font-bold mb-6">
        Departing Flights - {departureDate}
      </h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {departingFlights.map((flight) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="departingFlight"
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

FlightsDepartingForm.displayName = 'FlightsDepartingForm';

export default FlightsDepartingForm;
