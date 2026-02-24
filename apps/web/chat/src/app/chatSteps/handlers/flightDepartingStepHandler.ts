import { StepHandler } from '../types';

export const flightDepartingStepHandler: StepHandler = async ({
  tripData,
  chatMessages,
  setChatMessages,
}) => {
  try {
    // 1. Validate user selections
    if (!tripData.departureFlight) {
      return {
        success: false,
        error: 'Please select a departing flight',
      };
    }
    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process departing flight selection',
    };
  }
};
