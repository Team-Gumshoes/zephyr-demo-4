import { type ChatRequest, type ChatResponse, type Message } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';

export const hotelStepHandler: StepHandler = async ({
  tripData,
  chatMessages,
  setChatMessages
}) => {
  try {
    // 1. Validate user selections
    if (!tripData.hotel) {
      return {
        success: false,
        error: 'Please select a hotel',
      };
    }

    const humanMessage: Message = {
      type: 'human',
      content: 'Given the trip data provided, give me a text summary of the trip',
    };
    const request: ChatRequest = {
      messages: [...chatMessages, humanMessage],
      data: null,
      trip: tripData,
    };

    const response: ChatResponse = await sendChatMessage(request);
    console.log('response received in hotelStepHandler:');
    console.log(response);

    // Summary data only, nothing to parse

    setChatMessages([...request.messages, response.messages[response.messages.length - 1]]); // adding on ai response message
    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process hotel selection',
    };
  }
};
