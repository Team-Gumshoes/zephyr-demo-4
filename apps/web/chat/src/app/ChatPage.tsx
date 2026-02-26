import { Button, Dialogue } from '@allorai/shared-ui';
import { ModifyDetails } from '../components/modals/ModifyDetails';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ChatMessageList from '../components/ChatMessageList';
import ChatTypingIndicator from '../components/ChatTypingIndicator';
import useMultiStepChat from '../hooks/useMultiStepChat';
import parseStartingPrefs, { fallbackStartingPrefs } from '../utils/parseTripRequest';
import { stepHandlers } from './chatSteps/handlers';
import { StartingPrefs, Message } from '@allorai/shared-types';
import { ChatStep, createChatSteps } from './chatSteps/helpers/createChatSteps';
import { useTripStore } from '../store/useTripStore';

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startingPrefs: StartingPrefs | null = parseStartingPrefs(searchParams);

  const {
    tripData,
    flightOptions,
    hotelOptions,
    updateTripData,
    setFlightOptions,
    setHotelOptions,
    setActivityOptions,
    setTravelTips,
  } = useTripStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isChatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Seed the store with URL params once on mount
  useEffect(() => {
    updateTripData(startingPrefs || fallbackStartingPrefs);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const chatSteps: ChatStep[] = useMemo(
    () =>
      createChatSteps(
        tripData,
        flightOptions,
        hotelOptions,
        currentStepIndex,
        updateTripData,
        isChatLoading,
      ),
    [tripData, updateTripData, flightOptions, hotelOptions, currentStepIndex, isChatLoading],
  );

  const { steps, currentStep, next, isFirstStep, isLastStep } = useMultiStepChat(
    chatSteps,
    currentStepIndex,
    setCurrentStepIndex,
  );

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
      });

      if (!result.success) {
        setError(result.error || 'An error occurred');
        return;
      }

      if (isLastStep) {
        navigate('activities');
      } else if (result.shouldAdvance) {
        next();
      }
    } catch (err) {
      console.error('Step handler error:', err);
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
    </div>
  );
};

export default ChatPage;
