import { type Message, type ChatRequest } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { HotelResponseDataSchema } from '../schemas/hotelResponseSchema';

export const flightReturningStepHandler: StepHandler = async ({ tripData, setHotelOptions }) => {
  try {
    if (!tripData.returnFlight) {
      return {
        success: false,
        error: 'Please select a returning flight',
      };
    }

    const newMessage: Message = {
      type: 'human',
      content: 'Please find hotels for the trip',
    };
    const request: ChatRequest = {
      messages: [newMessage],
      data: null,
      trip: tripData,
    };

    const response = await sendChatMessage(request);
    console.log('response received in flightReturningStepHandler:');
    console.log(request);

    const parsedResponseData = HotelResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid hotel response data', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid hotel data from server',
      };
    }

    if (parsedResponseData.data.options) {
      setHotelOptions(parsedResponseData.data.options);
      return { success: true, shouldAdvance: true };
    } else {
      console.error("Missing 'options' from response in request for returning flights");
      return {
        success: false,
        error: 'Response from api-gateway did not contain the needed data',
      };
    }

  } catch (error) {
    return {
      success: false,
      error: 'Failed to process returning flight selection',
    };
  }
};
