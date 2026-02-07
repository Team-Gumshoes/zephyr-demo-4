import { useState } from 'react';
import { type ChatStep } from '../utils/createChatSteps';

const useMultiStepChat = (
  steps: ChatStep[],
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => (i === steps.length - 1 ? i : i + 1));
  }
  function back() {
    setCurrentStepIndex((i) => (i === 0 ? 0 : i - 1));
  }
  function goTo(i: number) {
    setCurrentStepIndex(i);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length -1,
  };
};

export default useMultiStepChat;
