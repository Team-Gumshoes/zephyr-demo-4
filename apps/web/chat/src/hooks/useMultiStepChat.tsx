import { Dispatch, SetStateAction } from 'react';
import { ChatStep } from '../app/chatSteps/helpers/createChatSteps';

const useMultiStepChat = (
  steps: ChatStep[],
  currentStepIndex: number,
  setCurrentStepIndex: Dispatch<SetStateAction<number>>,
) => {
  function next() {
    setCurrentStepIndex((prevIdx) => (prevIdx === steps.length - 1 ? prevIdx : prevIdx + 1));
  }

  function back() {
    setCurrentStepIndex((prevIdx) => (prevIdx === 0 ? prevIdx : prevIdx - 1));
  }

  return {
    currentStep: steps[currentStepIndex],
    steps,
    next,
    back,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};

export default useMultiStepChat;
