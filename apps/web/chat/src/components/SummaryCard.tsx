import FlightChip from './chips/FlightsChip';
import HotelChip from './chips/HotelChip';
import { formatDate, calculateNights } from '../utils/formatData';
import { TripData } from '@allorai/shared-types';

const SummaryCard = ({ data }: { data: TripData }) => {
  const departureDate = data.departureDate ? formatDate(data.departureDate) : 'March 15, 2026';
  const returnDate = data.returnDate ? formatDate(data.returnDate) : 'March 22, 2026';

  // Calculate total cost
  const departureCost = data.departureFlight?.price ?? 0;
  const returnCost = data.returnFlight?.price ?? 0;
  const nights = calculateNights(data.departureDate, data.returnDate);
  const hotelCost = data.hotel && nights != null ? data.hotel.price * nights : 0;
  const totalCost = departureCost + returnCost + hotelCost;

  return (
    <div className="summary-card bg-[#99abd7] flex flex-col gap-4 rounded-[20px] w-full">
      {/* Flights - Departing */}
      {data.departureFlight && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
            Departing ({departureDate})
          </h3>
          <FlightChip flight={data.departureFlight} />
        </div>
      )}

      {/* Flights - Return */}
      {data.returnFlight && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
            Return ({returnDate})
          </h3>
          <FlightChip flight={data.returnFlight} />
        </div>
      )}

      {/* Lodging */}
      {data.hotel && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">Lodging</h3>
          <HotelChip
            hotel={data.hotel}
            departureDate={data.departureDate}
            returnDate={data.returnDate}
          />
        </div>
      )}

      {/* Total Cost Summary */}
      {(data.departureFlight || data.returnFlight || data.hotel) && (
        <div className="flex flex-col gap-3 pt-2 border-t-2 border-black/20">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
              Total Cost
            </h3>
            <span className="font-bold text-2xl text-black">
              ${totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
