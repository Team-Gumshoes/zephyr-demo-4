import { travelBudgetStepHandler } from './travelBudgetStepHandler';
import { ChatStepName } from '../../lib/createChatSteps';
import { StepHandler, StepHandlerContext } from '../types';
import { flightDepartingStepHandler } from './flightDepartingStepHandler';
import { flightReturningStepHandler } from './flightReturningStepHandler';
import { hotelStepHandler } from './hotelStepHandler';
import { activityBudgetStepHandler } from './activityBudgetStepHandler';

const placeholder: StepHandler = async (context: StepHandlerContext) => {
  return Promise.resolve({ success: true, shouldAdvance: true });
};
export const stepHandlers: Record<ChatStepName, StepHandler> = {
  Budget: travelBudgetStepHandler,
  Departing: flightDepartingStepHandler,
  Returning: flightReturningStepHandler,
  Hotels: hotelStepHandler,
  Summary: async () => ({ success: true, shouldAdvance: true }),
  ActivityBudget: activityBudgetStepHandler,
  Activities: placeholder,
};
