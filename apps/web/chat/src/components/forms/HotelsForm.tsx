import { HotelResults } from '@allorai/shared-types';
import { ChatStepSequence } from '../../utils/createChatSteps';
import { calculateNights, formatDate } from '../../utils/formatDate';
import HotelChip from '../chips/HotelChip';
import clsx from 'clsx';

export type HotelsFormData = {
  hotelId?: string;
  hotel?: HotelResults;
  departureDate?: string;
  returnDate?: string;
  currentStepIndex: number;
};

type HotelsFormProps = HotelsFormData & {
  hotelOptions: HotelResults[];
  updateFields: (fields: Partial<HotelsFormData>) => void;
};

const HotelsForm = ({
  hotelId,
  departureDate,
  returnDate,
  currentStepIndex,
  hotelOptions,
  updateFields,
}: HotelsFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Hotels;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3">
        Available Hotels - {calculateNights(departureDate, returnDate)} nights
      </h2>
      <h3 className="text-lg font-bold mb-3">Check-in: {formatDate(departureDate)}</h3>
      <h3 className="text-lg font-bold mb-6">Checkout: {formatDate(returnDate)}</h3>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {hotelOptions.map((hotel) => (
            <label key={hotel.id} className="cursor-pointer group">
              <input
                type="radio"
                name="hotel"
                disabled={!isActive}
                value={hotel.id}
                checked={hotelId === hotel.id}
                onChange={(e) => updateFields({ hotelId: e.target.value, hotel: hotel })}
                className="sr-only peer"
              />
              <div
                className={clsx(
                  'peer-checked:ring-2 peer-checked:ring-[#3358ae] rounded-[20px] transition-all duration-200 ',
                  isActive && 'group-hover:scale-[1.02] group-hover:shadow-lg',
                  !isActive && hotelId !== hotel.id && 'hidden',
                )}
              >
                <HotelChip hotel={hotel} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
HotelsForm.displayName = 'HotelsForm';

export default HotelsForm;
