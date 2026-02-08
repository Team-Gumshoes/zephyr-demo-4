import { Dispatch, SetStateAction } from 'react';
import { type ChatStep } from '../utils/createChatSteps';
import { TripData } from '../app/app';

const useMultiStepChat = (
  steps: ChatStep[],
  data: TripData,
  setTripData: Dispatch<SetStateAction<TripData>>,
) => {
  function next() {
    setTripData((prevTripData) => {
      const prevIdx = prevTripData.currentStepIndex;
      return {
        ...prevTripData,
        currentStepIndex: prevIdx === steps.length - 1 ? prevIdx : prevIdx + 1,
      };
    });
  }

  function back() {
    setTripData((prevTripData) => {
      const prevIdx = prevTripData.currentStepIndex;
      return {
        ...prevTripData,
        currentStepIndex: prevIdx === 0 ? prevIdx : prevIdx - 1,
      };
    });
  }

  return {
    currentStepIndex: data.currentStepIndex,
    step: steps[data.currentStepIndex],
    steps,
    next,
    back,
    isFirstStep: data.currentStepIndex === 0,
    isLastStep: data.currentStepIndex === steps.length - 1,
  };
};

export default useMultiStepChat;
