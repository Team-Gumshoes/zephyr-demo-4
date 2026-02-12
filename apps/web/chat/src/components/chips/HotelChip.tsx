import { HotelResults } from '@allorai/shared-types';
import { calculateNights } from '../../utils/formatData';

type HotelChipProps = {
  hotel: HotelResults;
  departureDate?: string;
  returnDate?: string;
};

const HotelChip = ({ hotel, departureDate, returnDate }: HotelChipProps) => {
  const nights = calculateNights(departureDate, returnDate);
  const totalCost = nights != null ? hotel.price * nights : undefined;

  return (
    <div className="bg-[rgba(251,251,254,0.75)] border border-black flex gap-[30px] items-center p-6 rounded-[20px] w-full">
      {/* Hotel Price */}
      <div className="flex flex-col items-start min-w-[105px]">
        <span className="font-semibold text-black text-base leading-6">
          ${totalCost != null ? totalCost.toLocaleString() : '—'}
        </span>
        <span className="font-normal text-black text-base leading-6">
          ${hotel.price} /night
        </span>
      </div>

      {/* Hotel Name and Location */}
      <div className="flex flex-col items-start flex-1">
        <span className="font-semibold text-black text-base leading-6">{hotel.name}</span>
        <span className="font-normal text-black text-base leading-6">{hotel.location}</span>
      </div>

      {/* Ratings */}
      <div className="flex flex-col items-start shrink-0">
        <span className="font-semibold text-black text-base leading-6">
          {hotel.num_of_stars} Stars
        </span>
      </div>
    </div>
  );
};

export default HotelChip;
