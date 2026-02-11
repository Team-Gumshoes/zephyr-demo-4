import {
  SAMPLE_RETURNING_FLIGHTS_RESPONSE,
  type ChatRequest,
  type ChatResponse,
  type Message,
} from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { FlightResponseDataSchema } from '../schemas/flightResponseSchema';

export const flightDepartingStepHandler: StepHandler = async ({
  tripData,
  setDepartingFlightOptions,
}) => {
  try {
    let shouldAdvance = false;
    if (!tripData.departureFlight) {
      return {
        success: false,
        error: 'Please select a departing flight',
      };
    }

    // 2. Format api request correctly
    const newMessage: Message = {
      type: 'human',
      content: 'Please find outbound flights for the trip',
    };

    const request: ChatRequest = {
      messages: [newMessage],
      data: null,
      trip: tripData,
    };

    // 3. Make request to api-gateway
    const response: ChatResponse = await sendChatMessage(request);
    console.log('response received in flightDepartingStepHandler:');
    console.log(response);

    // 4. Parse and validate response into flight options
    const parsedResponseData = FlightResponseDataSchema.safeParse(
      SAMPLE_RETURNING_FLIGHTS_RESPONSE,
    );
    // const parsed = FlightResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid flight response data:', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid flight data from server',
      };
    }

    if (parsedResponseData.data.options) {
      setDepartingFlightOptions(parsedResponseData.data.options);
      shouldAdvance = true; // If everything worked out
    }

    return { success: true, shouldAdvance };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process departing flight selection',
    };
  }
};
