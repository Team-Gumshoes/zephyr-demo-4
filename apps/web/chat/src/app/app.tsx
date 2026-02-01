import { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import BudgetForm from '../components/forms/BudgetForm';
import ChatMessageList from '../components/ChatMessageList';
import clsx from 'clsx';
import FlightsForm from '../components/forms/FlightsForm';
import FlightInstructions from '../components/instructions/FlightInstructions';
import HotelInstructions from '../components/instructions/HotelInstructions';
import HotelsForm from '../components/forms/HotelsForm';
import Summary from '../components/summary/Summary';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

export type ChatStepName =
  | 'Budget'
  | 'Flights'
  | 'Hotels'
  | 'Summary'
  | 'Other';

export type ChatStep = {
  stepName: ChatStepName;
  instructions?: ReactNode;
  form: ReactNode;
};

export interface TripRequest {
  fromCity: string;
  toCity: string;
  departureDate: string;
  arrivalDate: string;
  budgetIncludes: string[];
  transportation: string[];
  preferences?: string;
}

function parseTripRequest(searchParams: URLSearchParams): TripRequest | null {
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');

  if (!fromCity || !toCity) {
    return null;
  }

  return {
    fromCity,
    toCity,
    departureDate: searchParams.get('departureDate') || '',
    arrivalDate: searchParams.get('arrivalDate') || '',
    budgetIncludes:
      searchParams.get('budgetIncludes')?.split(',').filter(Boolean) || [],
    transportation:
      searchParams.get('transportation')?.split(',').filter(Boolean) || [],
    preferences: searchParams.get('preferences') || undefined,
  };
}

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const tripRequest = parseTripRequest(searchParams);

  const [stepCount, setStepCount] = useState(1);
  const [thinking, setThinking] = useState(false);

  const chatSteps: ChatStep[] = [
    {
      stepName: 'Budget',
      instructions: <BudgetInstructions tripRequest={tripRequest} />,
      form: <BudgetForm />,
    },
    {
      stepName: 'Flights',
      instructions: <FlightInstructions />,
      form: <FlightsForm />,
    },
    {
      stepName: 'Hotels',
      instructions: <HotelInstructions />,
      form: <HotelsForm />,
    },
    {
      stepName: 'Summary',
      form: (
        <Summary
          data={{
            departingFlight: {
              id: 1,
              cost: '$450',
              airline: 'United Airlines',
              airlineLogo: undefined,
              departureTime: '08:30 AM',
              arrivalTime: '11:45 AM',
              duration: '3 hr 15 min',
              departureAirport: 'JFK',
              arrivalAirport: 'LAX',
            },
            returningFlight: {
              id: 2,
              cost: '$420',
              airline: 'Delta',
              airlineLogo: undefined,
              departureTime: '02:15 PM',
              arrivalTime: '10:30 PM',
              duration: '5 hr 15 min',
              departureAirport: 'LAX',
              arrivalAirport: 'JFK',
            },
            hotel: {
              id: 1,
              name: 'Grand Luxury Hotel',
              city: 'Los Angeles',
              rating: 4.5,
              reviewCount: 1234,
              totalCost: '$1,280',
              nightlyRate: '$320/nt',
              discount: '15% off',
              logo: undefined,
            },
          }}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className={clsx('flex justify-between h-full flex-col')}>
        <ChatMessageList
          chat={chatSteps.slice(0, stepCount)}
          thinking={thinking}
          incrementStep={() => {
            setThinking(true);
            setTimeout(() => {
              setStepCount((prev) => prev + 1);
              setThinking(false);
            }, 1000);
          }}
        />
      </div>
    </div>
  );
};

export default ChatPage;
