import { useRef, useLayoutEffect, useState } from 'react';
import { Hotel } from '@allorai/shared-types';
import { calculateNights, formatDate } from '../../utils/formatData';
import HotelChip from '../chips/HotelChip';
import clsx from 'clsx';
import { ChatStepSequence } from '../../app/chatSteps/helpers/createChatSteps';

export type HotelsFormData = {
  hotelId?: string;
  hotel?: Hotel;
  departureDate?: string;
  returnDate?: string;
  hotelCoords?: { latitude: number; longitude: number };
};

type HotelsFormProps = HotelsFormData & {
  hotelOptions: Hotel[];
  updateFields: (fields: Partial<HotelsFormData>) => void;
  isChatLoading: boolean;
  currentStepIndex: number;
};

const HotelsForm = ({
  hotelId,
  departureDate,
  returnDate,
  currentStepIndex,
  hotelOptions,
  updateFields,
  isChatLoading,
}: HotelsFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Hotels;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [chipMinHeight, setChipMinHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const heights = cardRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .map((el) => el.offsetHeight);
    if (heights.length === 0) return;
    const maxHeight = Math.max(...heights);
    setChipMinHeight((prev) => (prev === maxHeight ? prev : maxHeight));
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3">
        Available Hotels - {calculateNights(departureDate, returnDate)} nights
      </h2>
      <h3 className="text-lg font-bold mb-3">Check-in: {formatDate(departureDate)}</h3>
      <h3 className="text-lg font-bold mb-6">Checkout: {formatDate(returnDate)}</h3>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {hotelOptions.map((hotel, index) => (
            <label key={hotel.id} className="cursor-pointer group">
              <input
                type="radio"
                name="hotel"
                disabled={!isActive || isChatLoading}
                value={hotel.id}
                checked={hotelId === hotel.id}
                onChange={(e) => {
                  updateFields({
                    hotelId: e.target.value,
                    hotel: hotel,
                  });
                  if (hotel.latitude && hotel.longitude) {
                    updateFields({
                      hotelCoords: { latitude: hotel.latitude, longitude: hotel.longitude },
                    });
                  }
                }}
                className="sr-only peer"
              />
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={clsx(
                  'peer-checked:ring-2 peer-checked:ring-[#3358ae] rounded-[20px] transition-all duration-200 ',
                  isActive && 'group-hover:scale-[1.02] group-hover:shadow-lg',
                  !isActive && hotelId !== hotel.id && 'hidden',
                )}
              >
                <HotelChip
                  hotel={hotel}
                  departureDate={departureDate}
                  returnDate={returnDate}
                  minHeight={chipMinHeight}
                />
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
