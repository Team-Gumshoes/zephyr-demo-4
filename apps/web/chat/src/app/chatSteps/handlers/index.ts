import { travelBudgetStepHandler } from './travelBudgetStepHandler';
import { StepHandler } from '../types';
import { flightDepartingStepHandler } from './flightDepartingStepHandler';
import { flightReturningStepHandler } from './flightReturningStepHandler';
import { hotelStepHandler } from './hotelStepHandler';
import { activityBudgetStepHandler } from './activityBudgetStepHandler';
import { ChatStepName } from '../helpers/createChatSteps';

export const stepHandlers: Record<ChatStepName, StepHandler> = {
  Budget: travelBudgetStepHandler,
  Departing: flightDepartingStepHandler,
  Returning: flightReturningStepHandler,
  Hotels: hotelStepHandler,
  Summary: async () => ({ success: true, shouldAdvance: true }),
  ActivityBudget: activityBudgetStepHandler,
};
