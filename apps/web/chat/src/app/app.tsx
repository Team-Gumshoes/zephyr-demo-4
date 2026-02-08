// import { Button, ActivityCard, BudgetOverview } from '@allorai/shared-ui';
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
  hotelId: number;
  currentStepIndex: number;
}

const initialTripData: Pick<
  TripData,
  | 'flightPreference'
  | 'lodgingPreference'
  | 'flightDepartingId'
  | 'flightReturningId'
  | 'hotelId'
  | 'currentStepIndex'
> = {
  flightPreference: undefined,
  lodgingPreference: undefined,
  flightDepartingId: 0,
  flightReturningId: 0,
  hotelId: 0,
  currentStepIndex: 0,
};

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const tripRequest: TripRequest | null = parseTripRequest(searchParams);

  const [tripData, setTripData] = useState<TripData>({
    ...(tripRequest || fallbackTripRequest),
    ...initialTripData,
  });
  const [isChatLoading, setChatLoading] = useState(false);

  const updateFields = useCallback((fields: Partial<TripData>) => {
    setTripData((prev) => {
      return { ...prev, ...fields };
    });
  }, []);

  const CHAT_STEPS: ChatStep[] = useMemo(
    () => createChatSteps(tripData, updateFields),
    [tripData, updateFields],
  );

  const { steps, currentStepIndex, next, isFirstStep, isLastStep } =
    useMultiStepChat(CHAT_STEPS, tripData, setTripData);

  function onSubmit() {
    // check for validation errors here ?
    setChatLoading(true);
    // LLM call here
    setTimeout(() => {
      setChatLoading(false);
      if (!isLastStep) {
        return next();
      } else {
        alert('We will advance to the next page here.');
      }
    }, 1000);
  }

  const validationError = ''; // TODO handle validation

  console.log(steps);

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
            {validationError && (
              <div className="text-red-600 font-semibold mt-2">
                {validationError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;

// Placeholder for testing UI library components
{
  /* <div className="flex flex-col items-center gap-[50px] my-[100px]">
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
  <BudgetOverview
    items={[
      { label: 'flights', amount: 800 },
      { label: 'Hotels', amount: 600 },
      { label: 'Attractions', amount: 0 },
    ]}
  />
</div>; */
}
