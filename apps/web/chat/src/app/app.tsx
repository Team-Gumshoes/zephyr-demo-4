import { ReactNode, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import BudgetForm, {
  BudgetFormData,
  BudgetFormRef,
} from '../components/forms/BudgetForm';
import ChatMessageList from '../components/ChatMessageList';
import clsx from 'clsx';
import FlightsDepartingForm, {
  FlightsDepartingFormData,
  FlightsDepartingFormRef,
} from '../components/forms/FlightsDepartingForm';
import FlightDepartingInstructions from '../components/instructions/FlightDepartingInstructions';
import FlightsReturnForm, {
  FlightsReturnFormData,
  FlightsReturnFormRef,
  returnFlights,
} from '../components/forms/FlightsReturnForm';
import { departingFlights } from '../components/forms/FlightsDepartingForm';
import FlightReturnInstructions from '../components/instructions/FlightReturnInstructions';
import HotelInstructions from '../components/instructions/HotelInstructions';
import HotelsForm, {
  HotelsFormData,
  HotelsFormRef,
  hotels,
} from '../components/forms/HotelsForm';
import Summary from '../components/summary/Summary';
import { createChatSession, sendChatMessage } from './api/chat';
import parseTripRequest from '../utils/parseTripRequest';
import { Button, ActivityCard } from '@allorai/shared-ui';

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

// function parseTripRequest(searchParams: URLSearchParams): TripRequest | null {
//   const fromCity = searchParams.get('fromCity');
//   const toCity = searchParams.get('toCity');

//   if (!fromCity || !toCity) {
//     return null;
//   }

//   return {
//     fromCity,
//     toCity,
//     departureDate: searchParams.get('departureDate') || '',
//     arrivalDate: searchParams.get('arrivalDate') || '',
//     budgetIncludes:
//       searchParams.get('budgetIncludes')?.split(',').filter(Boolean) || [],
//     transportation:
//       searchParams.get('transportation')?.split(',').filter(Boolean) || [],
//     preferences: searchParams.get('preferences') || undefined,
//   };
// }

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const tripRequest = parseTripRequest(searchParams);

  const [stepCount, setStepCount] = useState(1);
  const [thinking, setThinking] = useState(false);

  // Budget form state
  const [budgetData, setBudgetData] = useState<BudgetFormData | null>(null);
  const [validationError, setValidationError] = useState('');
  const budgetFormRef = useRef<BudgetFormRef>(null);

  // Departing flights form state
  const [departingFlightData, setDepartingFlightData] =
    useState<FlightsDepartingFormData | null>(null);
  const departingFlightFormRef = useRef<FlightsDepartingFormRef>(null);

  // Return flights form state
  const [returnFlightData, setReturnFlightData] =
    useState<FlightsReturnFormData | null>(null);
  const returnFlightFormRef = useRef<FlightsReturnFormRef>(null);

  // Hotels form state
  const [hotelData, setHotelData] = useState<HotelsFormData | null>(null);
  const hotelsFormRef = useRef<HotelsFormRef>(null);

  // Get selected objects for Summary
  const selectedDepartingFlight = departingFlightData
    ? departingFlights.find(
        (f) => f.id === departingFlightData.selectedFlightId,
      )
    : undefined;
  const selectedReturnFlight = returnFlightData
    ? returnFlights.find((f) => f.id === returnFlightData.selectedFlightId)
    : undefined;
  const selectedHotel = hotelData
    ? hotels.find((h) => h.id === hotelData.selectedHotelId)
    : undefined;

  const chatSteps: ChatStep[] = [
    {
      stepName: 'Budget',
      instructions: <BudgetInstructions tripRequest={tripRequest} />,
      form: (
        <BudgetForm
          ref={budgetFormRef}
          onSubmit={async (data) => {
            await createChatSession();
            const response = await sendChatMessage({
              message: formatBudgetFormData(data),
            });
            console.log(response);
            setBudgetData(data);
          }}
          onValidationError={(error) => {
            setValidationError(error);
          }}
        />
      ),
    },
    {
      stepName: 'Flights',
      instructions: <FlightDepartingInstructions budgetData={budgetData} />,
      form: (
        <FlightsDepartingForm
          ref={departingFlightFormRef}
          tripRequest={tripRequest}
          onSubmit={(data) => {
            setDepartingFlightData(data);
          }}
          onValidationError={(error) => {
            setValidationError(error);
          }}
        />
      ),
    },
    {
      stepName: 'Flights',
      instructions: <FlightReturnInstructions budgetData={budgetData} />,
      form: (
        <FlightsReturnForm
          ref={returnFlightFormRef}
          tripRequest={tripRequest}
          onSubmit={(data) => {
            setReturnFlightData(data);
          }}
          onValidationError={(error) => {
            setValidationError(error);
          }}
        />
      ),
    },
    {
      stepName: 'Hotels',
      instructions: <HotelInstructions budgetData={budgetData} />,
      form: (
        <HotelsForm
          ref={hotelsFormRef}
          onSubmit={(data) => {
            setHotelData(data);
          }}
          onValidationError={(error) => {
            setValidationError(error);
          }}
        />
      ),
    },
    {
      stepName: 'Summary',
      form: (
        <Summary
          data={{
            departingFlight: selectedDepartingFlight,
            returningFlight: selectedReturnFlight,
            hotel: selectedHotel,
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
          validationError={validationError}
          incrementStep={() => {
            // If we're on the first step (Budget), validate the form first
            if (stepCount === 1) {
              const isValid = budgetFormRef.current?.submit();
              if (!isValid) {
                return; // Don't proceed if validation fails
              }
            }

            // If we're on the second step (Departing Flights), validate the form
            if (stepCount === 2) {
              const isValid = departingFlightFormRef.current?.submit();
              if (!isValid) {
                return; // Don't proceed if validation fails
              }
            }

            // If we're on the third step (Return Flights), validate the form
            if (stepCount === 3) {
              const isValid = returnFlightFormRef.current?.submit();
              if (!isValid) {
                return; // Don't proceed if validation fails
              }
            }

            // If we're on the fourth step (Hotels), validate the form
            if (stepCount === 4) {
              const isValid = hotelsFormRef.current?.submit();
              if (!isValid) {
                return; // Don't proceed if validation fails
              }
            }

            setThinking(true);
            setTimeout(() => {
              setStepCount((prev) => prev + 1);
              setThinking(false);
            }, 1000);
          }}
          decrementStep={() => {
            setValidationError(''); // Clear any validation errors
            setStepCount((prev) => Math.max(1, prev - 1)); // Don't go below step 1
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-[50px] my-[100px]">
        <Button className="w-fit" onClick={() => {}}>
          Test Component
        </Button>
        <ActivityCard
          title="Concert"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          estimatedCost="55"
          distance="44"
          onViewDetails={() => {}}
        />
      </div>
    </div>
  );
};

export default ChatPage;

const formatBudgetFormData = (data: BudgetFormData) => {
  return `
  The user has this pref: ${data.flightPreference}
  The user has this pref: ${data.lodgingPreference}
  Please provide options for flights
  `;
};
