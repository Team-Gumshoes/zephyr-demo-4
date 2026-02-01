import FlightChip, { Flight } from '../FlightsChip';

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

const returnFlights: Flight[] = [
  {
    id: 4,
    cost: '$ 475',
    airline: 'Delta',
    departureTime: '8:00 AM',
    arrivalTime: '4:30 PM',
    duration: '5 hr 30 min',
    departureAirport: 'LAX',
    arrivalAirport: 'JFK',
  },
  {
    id: 5,
    cost: '$ 550',
    airline: 'United',
    departureTime: '12:00 PM',
    arrivalTime: '8:15 PM',
    duration: '5 hr 15 min',
    departureAirport: 'LAX',
    arrivalAirport: 'JFK',
  },
  {
    id: 6,
    cost: '$ 410',
    airline: 'American',
    departureTime: '5:45 PM',
    arrivalTime: '1:30 AM',
    duration: '4 hr 45 min',
    departureAirport: 'LAX',
    arrivalAirport: 'JFK',
  },
];

const FlightsForm = ({ active = false }: { active?: boolean }) => {
  return (
    <form className="w-full">
      <h2 className="text-xl font-bold mb-6">Departing Flights</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {departingFlights.map((flight) => (
            <FlightChip key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
      <h2 className="text-xl font-bold my-6">Return Flights</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {returnFlights.map((flight) => (
            <FlightChip key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
    </form>
  );
};

export default FlightsForm;
