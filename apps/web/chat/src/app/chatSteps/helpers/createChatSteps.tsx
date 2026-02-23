import { ReactNode } from 'react';
import TravelBudgetForm from '../../../components/forms/TravelBudgetForm';
import FlightsDepartingForm from '../../../components/forms/FlightsDepartingForm';
import TravelBudgetInstructions from '../../../components/instructions/TravelBudgetInstructions';
import FlightDepartingInstructions from '../../../components/instructions/FlightDepartingInstructions';
import FlightReturnInstructions from '../../../components/instructions/FlightReturnInstructions';
import FlightsReturningForm from '../../../components/forms/FlightsReturningForm';
import HotelInstructions from '../../../components/instructions/HotelInstructions';
import HotelsForm from '../../../components/forms/HotelsForm';
import SummaryInstructions from '../../../components/instructions/SummaryInstructions';
import ActivityBudgetInstructions from '../../../components/instructions/ActivityBudgetInstructions';
import ActivityBudgetForm from '../../../components/forms/ActivityBudgetForm';
import ActivitiesForm from '../../../components/forms/ActivitiesForm';
import ItineraryForm from '../../../components/forms/ItineraryForm';
import { Flight, Hotel, TripData, Activity } from '@allorai/shared-types';

export enum ChatStepSequence {
  Budget,
  Departing,
  Returning,
  Hotels,
  Summary,
  ActivityBudget,
  Activities,
  Itinerary,
}

export type ChatStepName = keyof typeof ChatStepSequence;

export type ChatStep = {
  stepName: ChatStepName;
  instructions?: ReactNode;
  form: ReactNode;
};

const createChatSteps = (
  tripData: TripData,
  departingFlightOptions: Flight[],
  returningFlightOptions: Flight[],
  hotelOptions: Hotel[],
  activityOptions: Activity[],
  currentStepIndex: number,
  updateFields: (fields: Partial<TripData>) => void,
  isChatLoading: boolean,
  togglePin: (activityId: string) => void,
): ChatStep[] => [
  {
    stepName: 'Budget',
    instructions: <TravelBudgetInstructions {...tripData} />,
    form: (
      <TravelBudgetForm
        {...tripData}
        currentStepIndex={currentStepIndex}
        updateFields={updateFields}
        isChatLoading={isChatLoading}
      />
    ),
  },
  {
    stepName: 'Departing',
    instructions: <FlightDepartingInstructions {...tripData} />,
    form: (
      <FlightsDepartingForm
        {...tripData}
        currentStepIndex={currentStepIndex}
        departingFlightOptions={departingFlightOptions}
        updateFields={updateFields}
        isChatLoading={isChatLoading}
      />
    ),
  },
  {
    stepName: 'Returning',
    instructions: <FlightReturnInstructions {...tripData} />,
    form: (
      <FlightsReturningForm
        {...tripData}
        currentStepIndex={currentStepIndex}
        returningFlightOptions={returningFlightOptions}
        updateFields={updateFields}
        isChatLoading={isChatLoading}
      />
    ),
  },
  {
    stepName: 'Hotels',
    instructions: <HotelInstructions {...tripData} />,
    form: (
      <HotelsForm
        {...tripData}
        currentStepIndex={currentStepIndex}
        hotelOptions={hotelOptions}
        updateFields={updateFields}
        isChatLoading={isChatLoading}
      />
    ),
  },
  {
    stepName: 'Summary',
    instructions: <SummaryInstructions {...tripData} />,
    form: 'If this summary looks good, click next!',
  },
  {
    stepName: 'ActivityBudget',
    instructions: <ActivityBudgetInstructions />,
    form: (
      <ActivityBudgetForm
        {...tripData}
        currentStepIndex={currentStepIndex}
        updateFields={updateFields}
        isChatLoading={isChatLoading}
      />
    ),
  },
  {
    stepName: 'Activities',
    form: (
      <ActivitiesForm
        {...tripData}
        currentStepIndex={currentStepIndex}
        activityOptions={activityOptions}
        updateFields={updateFields}
        isChatLoading={isChatLoading}
        togglePin={togglePin}
      />
    ),
  },
  {
    stepName: 'Itinerary',
    form: <ItineraryForm {...tripData} activityOptions={activityOptions} />,
  },
];

export { createChatSteps };
