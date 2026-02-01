export type Flight = {
  id: number;
  cost: string;
  airlineLogo?: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirport: string;
  arrivalAirport: string;
};

const FlightChip = ({ flight }: { flight: Flight }) => {
  return (
    <div className="bg-[rgba(251,251,254,0.75)] border border-black flex items-center justify-between p-6 rounded-[20px] w-full">
      {/* Cost */}
      <div className="font-semibold text-[#050315] text-base whitespace-nowrap">
        {flight.cost}
      </div>

      {/* Airline Icon */}
      <div className="size-8 mx-2 flex items-center justify-center">
        {flight.airlineLogo ? (
          <img
            src={flight.airlineLogo}
            alt={flight.airline}
            className="size-full object-contain"
          />
        ) : (
          <div className="size-full bg-gray-300 rounded" />
        )}
      </div>

      {/* Flight Time and Airline */}
      <div className="flex flex-col items-start">
        <span className="font-medium text-[#050315] text-base leading-6">
          {flight.departureTime} - {flight.arrivalTime}
        </span>
        <span className="font-normal text-[#050315] text-base leading-6">
          {flight.airline}
        </span>
      </div>

      {/* Flight Path Visual */}
      <div className="flex items-center gap-1">
        <div className="size-2 rounded-full bg-[#F5A623]" />
        <div className="w-16 h-0.5 bg-[#F5A623]" />
        <div className="size-2 rounded-full bg-[#F5A623]" />
      </div>

      {/* Flight Length and Airports */}
      <div className="flex flex-col items-start">
        <span className="font-medium text-[#050315] text-base leading-6">
          {flight.duration}
        </span>
        <span className="font-normal text-[#050315] text-base leading-6">
          {flight.departureAirport} - {flight.arrivalAirport}
        </span>
      </div>
    </div>
  );
};

export default FlightChip;
