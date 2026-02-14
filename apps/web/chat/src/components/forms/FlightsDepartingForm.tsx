import { Flight } from '@allorai/shared-types';
import { ChatStepSequence } from '../../utils/createChatSteps';
import { formatDate } from '../../utils/formatData';
import FlightChip from '../chips/FlightsChip';
import clsx from 'clsx';

export type FlightsDepartingFormData = {
  departureFlight?: Flight;
  departureDate?: string;
  currentStepIndex: number;
};

type FlightsDepartingFormProps = FlightsDepartingFormData & {
  departingFlightOptions: Flight[];
  updateFields: (fields: Partial<FlightsDepartingFormData>) => void;
};

const FlightsDepartingForm = ({
  departureFlight,
  departureDate,
  currentStepIndex,
  departingFlightOptions,
  updateFields,
}: FlightsDepartingFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Departing;
  let flightDepartingId = departureFlight?.id;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">Departing Flights - {formatDate(departureDate)}</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {departingFlightOptions.map((flight, idx) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="departingFlight"
                disabled={!isActive}
                value={flight.id}
                checked={flightDepartingId === flight.id}
                onChange={(e) => {
                  updateFields({
                    departureFlight: flight,
                  });
                }}
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
