import { Button, Dialogue } from '@allorai/shared-ui';
import { ModifyDetails } from '../components/modals/ModifyDetails';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ChatMessageList from '../components/ChatMessageList';
import ChatTypingIndicator from '../components/ChatTypingIndicator';
import useMultiStepChat from '../hooks/useMultiStepChat';
import parseStartingPrefs, { fallbackStartingPrefs } from '../utils/parseTripRequest';
import { stepHandlers } from './chatSteps/handlers';
import {
  createEmptyTrip,
  Flight,
  Hotel,
  StartingPrefs,
  TripData,
  Activity,
  Message,
  TravelTip,
} from '@allorai/shared-types';
import { ChatStep, createChatSteps } from './chatSteps/helpers/createChatSteps';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

const initialTripData: TripData = {
  ...createEmptyTrip(),
};

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startingPrefs: StartingPrefs | null = parseStartingPrefs(searchParams);

  const [tripData, setTripData] = useState<TripData>({
    ...initialTripData,
    ...(startingPrefs || fallbackStartingPrefs),
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // TODO Consider putting all this state in Zustand
  const [flightOptions, setFlightOptions] = useState<Flight[]>([]);
  const [hotelOptions, setHotelOptions] = useState<Hotel[]>([]);
  const [activityOptions, setActivityOptions] = useState<Activity[]>([]);
  const [travelTips, setTravelTips] = useState<TravelTip[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isChatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [pendingActivitiesNav, setPendingActivitiesNav] = useState(false);

  const updateFields = useCallback((fields: Partial<TripData>) => {
    setTripData((prev) => {
      return { ...prev, ...fields };
    });
  }, []);

  const chatSteps: ChatStep[] = useMemo(
    () =>
      createChatSteps(
        tripData,
        flightOptions,
        hotelOptions,
        currentStepIndex,
        updateFields,
        isChatLoading,
      ),
    [tripData, updateFields, flightOptions, hotelOptions, currentStepIndex, isChatLoading],
  );

  const { steps, currentStep, next, isFirstStep, isLastStep } = useMultiStepChat(
    chatSteps,
    currentStepIndex,
    setCurrentStepIndex,
  );

  // Navigate to activities page after state has been updated with the fetched activity data.
  // Using useEffect ensures activityOptions and travelTips are the committed (non-stale) values.
  useEffect(() => {
    if (pendingActivitiesNav && !isChatLoading) {
      navigate('activities', {
        state: { activityOptions, travelTips, tripData },
      });
      setPendingActivitiesNav(false);
    }
  }, [pendingActivitiesNav, isChatLoading, activityOptions, travelTips, tripData, navigate]);

  const onSubmit = async () => {
    setChatLoading(true);
    setError(undefined);

    try {
      const handler = stepHandlers[currentStep.stepName];

      const result = await handler({
        tripData,
        chatMessages,
        setChatMessages,
        setFlightOptions,
        setHotelOptions,
        setActivityOptions,
        setTravelTips,
        updateFields, // <-- might not need this ?
        next, // <-- might not need this ?
      });

      if (!result.success) {
        setError(result.error || 'An error occurred');
        setChatLoading(false);
        return;
      }

      if (isLastStep) {
        setPendingActivitiesNav(true);
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

  if (false) {
    console.log('tripData', tripData);
    console.log(travelTips);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className={clsx('flex justify-between h-full flex-col')}>
        <ChatMessageList steps={steps} currentStepIndex={currentStepIndex} />
        <div className="flex justify-end gap-2">
          <div className={`flex flex-col items-end mr-14 mb-6 justify-end`}>
            <div className="flex gap-2">
              {!isFirstStep && !isLastStep && (
                <Button onClick={() => setIsDialogOpen(true)} variant="secondary">
                  Modify Details
                </Button>
              )}
              <Dialogue
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="How would you like to modify your trip details?"
                className="max-w-md"
              >
                <ModifyDetails />
              </Dialogue>
              <Button onClick={onSubmit}>
                {isChatLoading ? (
                  <ChatTypingIndicator content="Thinking" color="white" />
                ) : (
                  'Next Step'
                )}
              </Button>
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
