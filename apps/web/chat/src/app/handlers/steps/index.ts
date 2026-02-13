import { budgetStepHandler } from './budgetStepHandler';
import { ChatStepName } from '../../../utils/createChatSteps';
import { StepHandler, StepHandlerContext } from '../types';
import { flightDepartingStepHandler } from './flightDepartingStepHandler';
import { flightReturningStepHandler } from './flightReturningStepHandler';
// import { hotelStepHandler } from './hotelStepHandler';

const placeholder: StepHandler = async (context: StepHandlerContext) => {
  return Promise.resolve({ success: true, shouldAdvance: true });
};
export const stepHandlers: Record<ChatStepName, StepHandler> = {
  Budget: budgetStepHandler,
  Departing: flightDepartingStepHandler,
  Returning: flightReturningStepHandler,
  Hotels: placeholder,
  Summary: async () => ({ success: true, shouldAdvance: true }),
  ActivityBudget: async () => ({ success: true, shouldAdvance: true }),
  Activities: placeholder,
};
