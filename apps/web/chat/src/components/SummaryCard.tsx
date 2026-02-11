// import FlightChip from './chips/FlightsChip';
// import HotelChip from './chips/HotelChip';
import { formatDate } from '../utils/formatDate';
import { FlightResults, HotelResults, TripData } from '@allorai/shared-types';

export type SummaryData = {
  flightDepartingDetails?: FlightResults;
  flightReturningDetails?: FlightResults;
  hotelDetails?: HotelResults;
};

const SummaryCard = ({
  data,
  flights,
  hotels,
}: {
  data: TripData;
  flights: FlightResults;
  hotels: HotelResults;
}) => {
  const departureDate = data.departureDate ? formatDate(data.departureDate) : 'March 15, 2026';
  const returnDate = data.returnDate ? formatDate(data.returnDate) : 'March 22, 2026';

  return (
    <div className="bg-[#99abd7] flex flex-col gap-4 rounded-[20px] w-full">
      {/* Flights - Departing */}
      {data.departureFlight && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
            Departing ({departureDate})
          </h3>
          {/* <FlightChip flight={data.departureFlight} /> */}
        </div>
      )}

      {/* Flights - Return */}
      {data.returnFlight && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">
            Return ({returnDate})
          </h3>
          {/* <FlightChip flight={flights.returnFlight} /> */}
        </div>
      )}

      {/* Lodging */}
      {data.hotel && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-black tracking-[-1px] leading-[28.8px]">Lodging</h3>
          {/* <HotelChip hotel={data.hotel} /> */}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
