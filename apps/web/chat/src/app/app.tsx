// import {
//   Button,
//   ActivityCard,
//   BudgetOverview,
//   Dialogue,
// } from '@allorai/shared-ui';
import { Button, Dialogue } from '@allorai/shared-ui';
import { ModifyDetails } from '../components/modals/ModifyDetails';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatMessageList from '../components/ChatMessageList';
import ChatTypingIndicator from '../components/ChatTypingIndicator';
import useMultiStepChat from '../hooks/useMultiStepChat';
import { ChatStep, createChatSteps } from '../utils/createChatSteps';
import parseTripRequest, {
  fallbackTripRequest,
} from '../utils/parseTripRequest';
import { BudgetPref } from '../components/forms/BudgetForm';
import { stepHandlers } from './handlers/steps';
import { Flight } from '../components/chips/FlightsChip';
import { Hotel } from '../components/chips/HotelChip';
import { SAMPLE_DEPARTING_FLIGHTS } from '../components/forms/FlightsDepartingForm';
import { SAMPLE_RETURNING_FLIGHTS } from '../components/forms/FlightsReturningForm';
import { SAMPLE_HOTELS } from '../components/forms/HotelsForm';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

// TripRequest comes from the form on the landing page (query string)
export interface TripRequest {
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
  returnDate: string | null;
  preferences?: string;
  budgetIncludes: string[];
  transportation: string[];
}

export interface TripData extends TripRequest {
  departureFlight: string | null;
  returnFlight: string | null;
  budget: number | null;
  hotel: string | null;
  interests: string[];
  constraints: string[];
  flightPreference?: BudgetPref;
  lodgingPreference?: BudgetPref;
  currentStepIndex: number;
}

export function createEmptyTrip(): TripData {
  return {
    origin: null,
    destination: null,
    departureFlight: null,
    returnFlight: null,
    departureDate: null,
    returnDate: null,
    budget: null,
    hotel: null,
    interests: [],
    constraints: [],
    preferences: "",
    budgetIncludes: [],
    transportation: [],
    currentStepIndex: 0,
  };
}

const initialTripData = { ...createEmptyTrip(), currentStepIndex: 0}

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const tripRequest: TripRequest | null = parseTripRequest(searchParams);
  console.log(tripRequest)

  const [tripData, setTripData] = useState<TripData>({
    ...initialTripData,
    ...(tripRequest || fallbackTripRequest),
  });

  console.log({tripData})
  // TODO Consider putting all this state in Zustand
  const [departingFlightOptions, setDepartingFlightOptions] = useState<
    Flight[]
  >(SAMPLE_DEPARTING_FLIGHTS);
  const [returningFlightOptions, setReturningFlightOptions] = useState<
    Flight[]
  >(SAMPLE_RETURNING_FLIGHTS);
  const [hotelOptions, setHotelOptions] = useState<Hotel[]>(SAMPLE_HOTELS);
  const [isChatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const updateFields = useCallback((fields: Partial<TripData>) => {
    setTripData((prev) => {
      return { ...prev, ...fields };
    });
  }, []);

  const chatSteps: ChatStep[] = useMemo(
    () =>
      createChatSteps(
        tripData,
        departingFlightOptions,
        returningFlightOptions,
        hotelOptions,
        updateFields,
      ),
    [
      tripData,
      updateFields,
      departingFlightOptions,
      returningFlightOptions,
      hotelOptions,
    ],
  );

  const {
    steps,
    currentStep,
    currentStepIndex,
    next,
    isFirstStep,
    isLastStep,
  } = useMultiStepChat(chatSteps, tripData, setTripData);

  const onSubmit = async () => {
    setChatLoading(true);
    setError(undefined);

    try {
      const handler = stepHandlers[currentStep.stepName];

      const result = await handler({
        tripData,
        setDepartingFlightOptions,
        setReturningFlightOptions,
        setHotelOptions,
        updateFields, // <-- might not need this ?
        next, // <-- might not need this ?
      });

      if (!result.success) {
        setError(result.error || 'An error occurred');
        setChatLoading(false);
        return;
      }

      if (isLastStep) {
        alert('We will advance to the next page here.');
      } else if (result.shouldAdvance) {
        next();
      }
    } catch (error) {
      // Unlikely to be catching here as things stand. Maybe in the future we will re-throw inside our handlers (?)
      console.error('Step handler error:', error);
      setError('An unexpected error occurred');
    } finally {
      setChatLoading(false);
    }
  };

  if (!tripRequest) {
    return <div>Something went wrong. Query string not parsed.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className={clsx('flex justify-between h-full flex-col')}>
        <ChatMessageList steps={steps} currentStepIndex={currentStepIndex} />
        <div className="flex justify-end gap-2">
          <div className={`flex flex-col items-end mr-14 mb-6 justify-end`}>
            <div className="flex gap-2">
              {!isFirstStep && (
                <>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    variant="secondary"
                  >
                    Modify Details
                  </Button>
                  <Dialogue
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    title="How would you like to modify your trip details?"
                  >
                    <ModifyDetails />
                  </Dialogue>
                </>
              )}
              <Button onClick={onSubmit}>
                {isChatLoading ? (
                  <ChatTypingIndicator content="Thinking" color="white" />
                ) : (
                  'Next Step'
                )}
              </Button>
            </div>
            {error && (
              <div className="text-red-600 font-semibold mt-2">{error}</div>
            )}
          </div>
        </div>
      </div>
      ;
    </div>
  );
};
export default ChatPage;

// Placeholder for testing UI library components
{
  /* <div className="flex flex-col items-center gap-[50px] my-[100px]">
  <Button className="w-fit" onClick={() => setIsDialogOpen(true)}>
    Test Component
  </Button>
  <Dialogue
    isOpen={isDialogOpen}
    onClose={() => setIsDialogOpen(false)}
    title="How would you like to modify your trip details?"
  >
    <ModifyDetails />
  </Dialogue>
  <ActivityCard
    title="Concert"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    estimatedCost="55"
    distance="44"
    onViewDetails={() => {}}
  />
  <BudgetOverview
    items={[
      { label: 'flights', amount: 800 },
      { label: 'Hotels', amount: 600 },
      { label: 'Attractions', amount: 0 },
    ]}
  />
</div>; */
}
