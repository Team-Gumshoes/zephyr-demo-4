import { ReactNode } from 'react';
import { TripData } from '../app/app';
import BudgetForm from '../components/forms/BudgetForm';
import FlightsDepartingForm from '../components/forms/FlightsDepartingForm';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import FlightDepartingInstructions from '../components/instructions/FlightDepartingInstructions';
import FlightReturnInstructions from '../components/instructions/FlightReturnInstructions';
import FlightsReturningForm from '../components/forms/FlightsReturningForm';
import HotelInstructions from '../components/instructions/HotelInstructions';
import HotelsForm from '../components/forms/HotelsForm';
import { type Flight } from '../components/chips/FlightsChip';
import { type Hotel } from '../components/chips/HotelChip';

export type ChatStepName =
  | 'Budget'
  | 'Departing'
  | 'Returning'
  | 'Hotels'
  | 'Summary'
  | 'Other';

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
    form: (
      <HotelsForm
        {...tripData}
        hotelOptions={hotelOptions}
        updateFields={updateFields}
      />
    ),
  },
];

export { createChatSteps };
