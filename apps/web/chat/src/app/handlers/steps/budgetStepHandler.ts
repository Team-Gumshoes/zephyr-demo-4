import {
  SAMPLE_DEPARTING_FLIGHTS_RESPONSE,
  type ChatRequest,
  type ChatResponse,
  type Message,
} from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { FlightResponseDataSchema } from '../schemas/flightResponseSchema';
import { StepHandler } from '../types';

export const budgetStepHandler: StepHandler = async ({ tripData, setDepartingFlightOptions }) => {
  try {
    // 1. Validate user selections
    if (!tripData.flightPreference || !tripData.lodgingPreference) {
      return {
        success: false,
        error: 'Please select both flight and lodging preferences',
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
      SAMPLE_DEPARTING_FLIGHTS_RESPONSE,
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
    }

    const shouldAdvance = true;

    return { success: true, shouldAdvance };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process budget preferences',
    };
  }
};
