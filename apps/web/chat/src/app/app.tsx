import { Button } from '@allorai/shared-ui';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatMessageList from '../components/ChatMessageList';
import ChatTypingIndicator from '../components/ChatTypingIndicator';
import useMultiStepChat from '../hooks/useMultiStepChat';
import { ChatStep, createChatSteps } from '../utils/createChatSteps';
import parseTripRequest, {
  fallbackTripRequest,
  TripRequest,
} from '../utils/parseTripRequest';
import { BudgetPref } from '../components/forms/BudgetForm';
import { stepHandlers } from './handlers/steps';
import { Flight } from '../components/chips/FlightsChip';
import { SAMPLE_DEPARTING_FLIGHTS } from '../components/forms/FlightsDepartingForm';
import { SAMPLE_RETURNING_FLIGHTS } from '../components/forms/FlightsReturningForm';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

/*
{
  messages: [],
  trip: {
    destination: null,
    dates: null,
    budget: null,
    hotel: null,
    interests: [],
    constraints: []
  }
}
*/

export interface TripData extends TripRequest {
  flightPreference: BudgetPref | undefined;
  lodgingPreference: BudgetPref | undefined;
  flightDepartingId: number;
  flightReturningId: number;
  currentStepIndex: number;
}

const initialTripData: Pick<
  TripData,
  | 'flightPreference'
  | 'lodgingPreference'
  | 'flightDepartingId'
  | 'flightReturningId'
  | 'currentStepIndex'
> = {
  flightPreference: undefined,
  lodgingPreference: undefined,
  flightDepartingId: 0,
  flightReturningId: 0,
  currentStepIndex: 0,
};

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const tripRequest: TripRequest | null = parseTripRequest(searchParams);

  const [tripData, setTripData] = useState<TripData>({
    ...(tripRequest || fallbackTripRequest),
    ...initialTripData,
  });

  // TODO Consider putting all this state in Zustand
  const [departingFlightOptions, setDepartingFlightOptions] = useState<
    Flight[]
  >(SAMPLE_DEPARTING_FLIGHTS);
  const [returningFlightOptions, setReturningFlightOptions] = useState<
    Flight[]
  >(SAMPLE_RETURNING_FLIGHTS);
  const [isChatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

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
        updateFields,
      ),
    [tripData, updateFields, departingFlightOptions, returningFlightOptions],
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
          <div className={`flex flex-col items-end mr-14 justify-end`}>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button
                  onClick={() => console.log('clicked')}
                  variant="secondary"
                >
                  Modify Details
                </Button>
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
    </div>
  );
};

export default ChatPage;
