import { ReactNode } from 'react';
import { TripData } from '../app/app';
import BudgetForm from '../components/forms/BudgetForm';
import FlightsDepartingForm from '../components/forms/FlightsDepartingForm';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import FlightDepartingInstructions from '../components/instructions/FlightDepartingInstructions';
import FlightReturnInstructions from '../components/instructions/FlightReturnInstructions';
import FlightsReturningForm from '../components/forms/FlightsReturningForm';

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
  updateFields: (fields: Partial<TripData>) => void,
): ChatStep[] => [
  {
    stepName: 'Budget',
    form: <BudgetForm {...tripData} updateFields={updateFields} />,
    instructions: <BudgetInstructions {...tripData} />,
  },
  {
    stepName: 'Departing',
    form: <FlightsDepartingForm {...tripData} updateFields={updateFields} />,
    instructions: <FlightDepartingInstructions {...tripData} />,
  },
  {
    stepName: 'Returning',
    instructions: <FlightReturnInstructions {...tripData} />,
    form: <FlightsReturningForm {...tripData} updateFields={updateFields} />,
  },
];

export { createChatSteps };
