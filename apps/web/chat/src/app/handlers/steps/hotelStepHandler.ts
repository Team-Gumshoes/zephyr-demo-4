import { type ChatResponse } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { createChatRequest } from '../helpers/chatRequest';

export const hotelStepHandler: StepHandler = async ({
  tripData,
  chatMessages,
  setChatMessages,
}) => {
  try {
    // 1. Validate user selections
    if (!tripData.hotel) {
      return {
        success: false,
        error: 'Please select a hotel',
      };
    }

    const request = createChatRequest('summary', tripData, chatMessages);

    const response: ChatResponse = await sendChatMessage(request);

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
