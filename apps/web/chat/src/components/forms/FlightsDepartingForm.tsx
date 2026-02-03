import FlightChip, { Flight } from '../chips/FlightsChip';

const departingFlights: Flight[] = [
  {
    id: 1,
    cost: '$ 450',
    airline: 'Delta',
    departureTime: '6:00 AM',
    arrivalTime: '9:30 AM',
    duration: '3 hr 30 min',
    departureAirport: 'JFK',
    arrivalAirport: 'LAX',
  },
  {
    id: 2,
    cost: '$ 520',
    airline: 'United',
    departureTime: '10:15 AM',
    arrivalTime: '1:45 PM',
    duration: '3 hr 30 min',
    departureAirport: 'JFK',
    arrivalAirport: 'LAX',
  },
  {
    id: 3,
    cost: '$ 380',
    airline: 'American',
    departureTime: '2:30 PM',
    arrivalTime: '6:15 PM',
    duration: '3 hr 45 min',
    departureAirport: 'JFK',
    arrivalAirport: 'LAX',
  },
];

const FlightsDepartingForm = ({ active = false }: { active?: boolean }) => {
  return (
    <form className="w-full">
      <h2 className="text-xl font-bold mb-6">Departing Flights</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {departingFlights.map((flight) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="departingFlight"
                value={flight.id}
                className="sr-only peer"
              />
              <div className="peer-checked:ring-2 peer-checked:ring-[#3358ae] peer-checked:ring-offset-2 rounded-[20px] transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg">
                <FlightChip flight={flight} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

export default FlightsDepartingForm;
