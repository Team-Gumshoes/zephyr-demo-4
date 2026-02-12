import { FlightResults } from '@allorai/shared-types';
import { ChatStepSequence } from '../../utils/createChatSteps';
import { formatDate } from '../../utils/formatData';
import FlightChip from '../chips/FlightsChip';
import clsx from 'clsx';

export type FlightsReturningFormData = {
  returnFlight?: FlightResults;
  returnDate?: string;
  currentStepIndex: number;
};

type FlightsReturningFormProps = FlightsReturningFormData & {
  returningFlightOptions: FlightResults[];
  updateFields: (fields: Partial<FlightsReturningFormData>) => void;
};

const FlightsReturningForm = ({
  returnFlight,
  returnDate,
  currentStepIndex,
  returningFlightOptions,
  updateFields,
}: FlightsReturningFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Returning;
  let flightReturningId = returnFlight?.id;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">Returning Flights - {formatDate(returnDate)}</h2>
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
                  updateFields({
                    returnFlight: flight,
                  })
                }
                className="sr-only peer"
              />
              <div
                className={clsx(
                  'peer-checked:ring-2 peer-checked:ring-[#3358ae] rounded-[20px] transition-all duration-200 ',
                  isActive && 'group-hover:scale-[1.02] group-hover:shadow-lg',
                  !isActive && flightReturningId !== flight.id && 'hidden',
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
FlightsReturningForm.displayName = 'FlightsReturnForm';

export default FlightsReturningForm;
