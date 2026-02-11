import { SAMPLE_HOTELS_RESPONSE, type ChatRequest } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { HotelResponseDataSchema } from '../schemas/hotelResponseSchema';

export const flightReturningStepHandler: StepHandler = async ({ tripData, setHotelOptions }) => {
  try {
    let shouldAdvance = false;
    if (!tripData.returnFlight) {
      return {
        success: false,
        error: 'Please select a returning flight',
      };
    }
    const request: ChatRequest = {
      messages: [],
      data: null,
      trip: tripData,
    };

    const response = await sendChatMessage(request);
    console.log('response received in flightReturningStepHandler:');
    console.log(response);

    const parsedResponseData = HotelResponseDataSchema.safeParse(SAMPLE_HOTELS_RESPONSE);
    // const parsedResponseData = HotelResponseDataSchema.safeParse(response.data)

    if (!parsedResponseData.success) {
      console.error('Invalid hotel response data', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid hotel data from server',
      };
    }

    if (parsedResponseData.data.options) {
      setHotelOptions(parsedResponseData.data.options);
      shouldAdvance = true; // If everything worked out
    }

    return { success: true, shouldAdvance };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process returning flight selection',
    };
  }
};
