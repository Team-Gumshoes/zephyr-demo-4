import { StepHandler } from '../types';
// import { type ChatResponse } from '@allorai/shared-types';
// import { sendChatMessage } from '../../api/chat';
// import { FlightResponseDataSchema } from '../schemas/flightResponseSchema';
// import { createChatRequest } from '../helpers/chatRequest';

export const flightDepartingStepHandler: StepHandler = async ({
  tripData,
  // setReturningFlightOptions,
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

    // const request = createChatRequest('returningFlights', tripData, chatMessages);

    // const response: ChatResponse = await sendChatMessage(request);

    // const parsedResponseData = FlightResponseDataSchema.safeParse(response.data);

    // if (!parsedResponseData.success) {
    //   console.error(
    //     'Invalid flight response data for returning flights:',
    //     parsedResponseData.error.issues,
    //   );
    //   return {
    //     success: false,
    //     error: 'Received invalid flight data from server',
    //   };
    // }
    // if (!parsedResponseData.data.options) {
    //   console.error("Missing 'options' from response in request for returning flights");
    //   return {
    //     success: false,
    //     error: 'Response from api-gateway did not contain the needed data',
    //   };
    // }

    // setChatMessages([...request.messages, response.messages[response.messages.length - 1]]); // adding on ai response message
    // setReturningFlightOptions(parsedResponseData.data.options);
    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process departing flight selection',
    };
  }
};
