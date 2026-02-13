import { ReactNode } from 'react';
import BudgetForm from '../components/forms/BudgetForm';
import FlightsDepartingForm from '../components/forms/FlightsDepartingForm';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import FlightDepartingInstructions from '../components/instructions/FlightDepartingInstructions';
import FlightReturnInstructions from '../components/instructions/FlightReturnInstructions';
import FlightsReturningForm from '../components/forms/FlightsReturningForm';
import HotelInstructions from '../components/instructions/HotelInstructions';
import HotelsForm from '../components/forms/HotelsForm';
import SummaryCard from '../components/SummaryCard';
import ActivityBudgetInstructions from '../components/instructions/ActivityBudgetInstructions';
import ActivityBudgetForm from '../components/forms/ActivityBudgetForm';
import ActivitiesForm from '../components/forms/ActivitiesForm';
import { FlightResults, HotelResults, TripData, Activity } from '@allorai/shared-types';

export enum ChatStepSequence {
  Budget,
  Departing,
  Returning,
  Hotels,
  Summary,
  ActivityBudget,
  Activities,
}

export type ChatStepName = keyof typeof ChatStepSequence;

export type ChatStep = {
  stepName: ChatStepName;
  instructions?: ReactNode;
  form: ReactNode;
};

const createChatSteps = (
  tripData: TripData,
  departingFlightOptions: FlightResults[],
  returningFlightOptions: FlightResults[],
  hotelOptions: HotelResults[],
  activityOptions: Activity[],
  updateFields: (fields: Partial<TripData>) => void,
): ChatStep[] => [
  {
    stepName: 'Budget',
    instructions: <BudgetInstructions {...tripData} />,
    form: <BudgetForm {...tripData} updateFields={updateFields} />,
  },
  {
    stepName: 'Departing',
    instructions: <FlightDepartingInstructions {...tripData} />,
    form: (
      <FlightsDepartingForm
        {...tripData}
        departingFlightOptions={departingFlightOptions}
        updateFields={updateFields}
      />
    ),
  },
  {
    stepName: 'Returning',
    instructions: <FlightReturnInstructions {...tripData} />,
    form: (
      <FlightsReturningForm
        {...tripData}
        returningFlightOptions={returningFlightOptions}
        updateFields={updateFields}
      />
    ),
  },
  {
    stepName: 'Hotels',
    instructions: <HotelInstructions {...tripData} />,
    form: <HotelsForm {...tripData} hotelOptions={hotelOptions} updateFields={updateFields} />,
  },
  {
    stepName: 'Summary',
    form: <SummaryCard data={tripData} />,
  },
  {
    stepName: 'ActivityBudget',
    instructions: <ActivityBudgetInstructions />,
    form: <ActivityBudgetForm {...tripData} updateFields={updateFields} />,
  },
  {
    stepName: 'Activities',
    form: (
      <ActivitiesForm {...tripData} activityOptions={activityOptions} updateFields={updateFields} />
    ),
  },
];

export { createChatSteps };
