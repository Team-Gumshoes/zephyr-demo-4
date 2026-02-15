import { type ChatRequest, type ChatResponse, type Message } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { FlightResponseDataSchema } from '../schemas/flightResponseSchema';

export const flightDepartingStepHandler: StepHandler = async ({
  tripData,
  setReturningFlightOptions,
}) => {
  try {
    if (!tripData.departureFlight) {
      return {
        success: false,
        error: 'Please select a departing flight',
      };
    }

    const newMessage: Message = {
      type: 'human',
      content: 'Please find return flights for the trip',
    };
    const request: ChatRequest = {
      messages: [newMessage],
      data: null,
      trip: tripData,
    };

    const response: ChatResponse = await sendChatMessage(request);
    console.log('response received in flightDepartingStepHandler:');
    console.log(response);

    const parsedResponseData = FlightResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid flight response data:', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid flight data from server',
      };
    }

    if (parsedResponseData.data.options) {
      setReturningFlightOptions(parsedResponseData.data.options);
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
      error: 'Failed to process departing flight selection',
    };
  }
};
