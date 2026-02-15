import { type ChatRequest, type ChatResponse, type Message } from '@allorai/shared-types';
import { FlightResponseDataSchema } from '../schemas/flightResponseSchema';
import { createChatSession, sendChatMessage } from '../../api/chat';
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

    // 1.5 Create a new chat session before sending the first message
    await createChatSession();

    // 2. Format api request correctly
    // FORMAT: Here, we format the user selection to create a message that the LLM
    // will understand and will result in a response with a list of departing flight options
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
    console.log('response received in budgetStepHandler:');
    console.log(response);

    // 4. Parse and validate response into flight options
    const parsedResponseData = FlightResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid flight response data:', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid flight data from server',
      };
    }

    if (parsedResponseData.data.options) {
      setDepartingFlightOptions(parsedResponseData.data.options);
      return { success: true, shouldAdvance: true };
    } else {
      console.error("Missing 'options' from response in request for departing flights");
      return {
        success: false,
        error: 'Response from api-gateway did not contain the needed data',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process budget preferences',
    };
  }
};
