// @ts-ignore
import { Button, Dialogue, ActivityCard, BudgetOverview } from '@allorai/shared-ui';
import { ModifyDetails } from '../components/modals/ModifyDetails';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatMessageList from '../components/ChatMessageList';
import ChatTypingIndicator from '../components/ChatTypingIndicator';
import useMultiStepChat from '../hooks/useMultiStepChat';
import { ChatStep, createChatSteps } from '../utils/createChatSteps';
import parseStartingPrefs, { fallbackStartingPrefs } from '../utils/parseTripRequest';
import { stepHandlers } from './handlers/steps';
import {
  createEmptyTrip,
  Flight,
  Hotel,
  SAMPLE_DEPARTING_FLIGHTS,
  SAMPLE_HOTELS,
  SAMPLE_RETURNING_FLIGHTS,
  SAMPLE_ACTIVITIES,
  StartingPrefs,
  TripData,
  Activity,
} from '@allorai/shared-types';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

const initialTripData: TripData & { currentStepIndex: number } = {
  ...createEmptyTrip(),
  currentStepIndex: 0,
};

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const startingPrefs: StartingPrefs | null = parseStartingPrefs(searchParams);
  console.log('-------Starting Preferences--------');
  console.log(startingPrefs);

  const [tripData, setTripData] = useState<TripData>({
    ...initialTripData,
    ...(startingPrefs || fallbackStartingPrefs),
  });

  console.log('-------Trip Data--------');
  console.log({ tripData });
  // TODO Consider putting all this state in Zustand
  const [departingFlightOptions, setDepartingFlightOptions] =
    useState<Flight[]>(SAMPLE_DEPARTING_FLIGHTS);
  const [returningFlightOptions, setReturningFlightOptions] =
    useState<Flight[]>(SAMPLE_RETURNING_FLIGHTS); // Change to a
  const [hotelOptions, setHotelOptions] = useState<Hotel[]>(SAMPLE_HOTELS);
  const [activityOptions, setActivityOptions] = useState<Activity[]>(SAMPLE_ACTIVITIES);
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
        activityOptions,
        updateFields,
      ),
    [tripData, updateFields, departingFlightOptions, returningFlightOptions, hotelOptions],
  );

  const { steps, currentStep, currentStepIndex, next, isFirstStep, isLastStep } = useMultiStepChat(
    chatSteps,
    tripData,
    setTripData,
  );

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
        setActivityOptions,
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
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  if (!startingPrefs) {
    return <div>Something went wrong. Query string not parsed.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className={clsx('flex justify-between h-full flex-col')}>
        <ChatMessageList steps={steps} currentStepIndex={currentStepIndex} />
        <div className="flex justify-end gap-2">
          <div className={`flex flex-col items-end mr-14 mb-6 justify-end`}>
            <div className="flex gap-2">
              {!isFirstStep && !isLastStep && (
                <>
                  <Button onClick={() => setIsDialogOpen(true)} variant="secondary">
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
              {!isLastStep && (
                <Button onClick={onSubmit}>
                  {isChatLoading ? (
                    <ChatTypingIndicator content="Thinking" color="white" />
                  ) : (
                    'Next Step'
                  )}
                </Button>
              )}
            </div>
            {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
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
</div> */
}
