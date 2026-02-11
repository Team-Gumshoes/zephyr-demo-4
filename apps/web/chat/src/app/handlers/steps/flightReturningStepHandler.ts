import type { ChatRequest } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';

export const flightReturningStepHandler: StepHandler = async ({ tripData }) => {
  try {
    if (!tripData.returnFlight) {
      return {
        success: false,
        error: 'Please select a returning flight',
      };
    }

    // FORMAT: Here, we format the user selection to create a message that the LLM will understand and will
    // result in a response with a list of hotel options
    const request: ChatRequest = {
      messages: [],
      data: null,
      trip: tripData
    }
    // SEND: Now we Send to LLM
    const response = await sendChatMessage(request);

    // INSPECT RESPONSE: Here is where we will check if the response is the structured output that we expect
    // we expect a response with hotel options here
    // we will have to pass in setter: setHotelOptions
    // and use it here

    const shouldAdvance = true; // If everything worked out

    console.log('Flight returning response:', response);

    return { success: true, shouldAdvance };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process returning flight selection',
    };
  }
};
