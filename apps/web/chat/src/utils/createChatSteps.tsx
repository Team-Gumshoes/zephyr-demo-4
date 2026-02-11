import { ReactNode } from 'react';
import BudgetForm from '../components/forms/BudgetForm';
import FlightsDepartingForm from '../components/forms/FlightsDepartingForm';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import FlightDepartingInstructions from '../components/instructions/FlightDepartingInstructions';
import FlightReturnInstructions from '../components/instructions/FlightReturnInstructions';
import FlightsReturningForm from '../components/forms/FlightsReturningForm';
import HotelInstructions from '../components/instructions/HotelInstructions';
import HotelsForm from '../components/forms/HotelsForm';
import { FlightResults, HotelResults, TripData } from '@allorai/shared-types';

export enum ChatStepSequence {
  Budget,
  Departing,
  Returning,
  Hotels,
  Summary,
  Other,
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
];

export { createChatSteps };
