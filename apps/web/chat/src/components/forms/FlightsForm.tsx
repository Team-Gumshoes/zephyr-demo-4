import FlightChip, { Flight } from '../FlightsChip';

const flights: Flight[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

const FlightsForm = ({ active = false }: { active?: Boolean }) => {
  return (
    <form className="w-full">
      <div className="">Departing Flights</div>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {flights.map((flight) => (
            <FlightChip key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
      <div className="">Return Flights</div>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {flights.map((flight) => (
            <FlightChip key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
    </form>
  );
};

export default FlightsForm;
