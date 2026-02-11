import FlightChip from '../chips/FlightsChip';
import HotelChip from '../chips/HotelChip';
import { formatDate } from '../../utils/formatDate';
import { FlightResults, HotelResults } from '@allorai/shared-types';

export type SummaryData = {
  departingFlight?: FlightResults;
  returningFlight?: FlightResults;
  hotel?: HotelResults;
};

const Summary = ({ data }: { data: SummaryData }) => {
  const departureDate =
    'data.departingFlight?.date'.length > 1
      ? formatDate('data.departingFlight.date')
      : 'March 15, 2026';
  const returnDate =
    'data.returningFlight?.date'.length > 1
      ? formatDate('data.returningFlight.date')
      : 'March 22, 2026';

  return (
    <div className="bg-[#99abd7] flex flex-col gap-4 rounded-[20px] w-full">
      {/* Flights - Departing */}
      {data.departingFlight && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
            Departing ({departureDate})
          </h3>
          <FlightChip flight={data.departingFlight} />
        </div>
      )}

      {/* Flights - Return */}
      {data.returningFlight && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
            Return ({returnDate})
          </h3>
          <FlightChip flight={data.returningFlight} />
        </div>
      )}

      {/* Lodging */}
      {data.hotel && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">Lodging</h3>
          <HotelChip hotel={data.hotel} />
        </div>
      )}
    </div>
  );
};

export default Summary;
