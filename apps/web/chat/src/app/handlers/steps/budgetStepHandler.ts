import { SAMPLE_DEPARTING_FLIGHTS } from '../../../components/forms/FlightsDepartingForm';
import type { ChatRequest, Message } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';

export const budgetStepHandler: StepHandler = async ({ tripData, setDepartingFlightOptions }) => {
  try {
    if (!tripData.flightPreference || !tripData.lodgingPreference) {
      return {
        success: false,
        error: 'Please select both flight and lodging preferences',
      };
    }

    // FORMAT: Here, we format the user selection to create a message that the LLM will understand and will
    // result in a response with a list of departing flight options

    // SEND: Now we Send to LLM
    const newMessage: Message = { type: "human", content: "Please find outbound flights for the trip"}

    const request: ChatRequest = {
      messages: [newMessage],
      data: null,
      trip: tripData
    }


    const response = await sendChatMessage(request);

    // INSPECT RESPONSE: Here is where we will check if the response is the structured output that we expect
    // we expect a response with departing flight options here and we update state if we get a good response
    setDepartingFlightOptions(SAMPLE_DEPARTING_FLIGHTS)
    const shouldAdvance = true; // If everything worked out

    console.log('>>>>>>>>>>>>>>>> Budget step response:<<<<<<<<<<<<<<<');
    console.log(response);
    console.log('>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<');

    return { success: true, shouldAdvance };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process budget preferences',
    };
  }
};
