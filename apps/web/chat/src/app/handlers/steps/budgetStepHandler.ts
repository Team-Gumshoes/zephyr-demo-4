import { SAMPLE_DEPARTING_FLIGHTS } from '../../../components/forms/FlightsDepartingForm';
import { createChatSession, sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';

export const budgetStepHandler: StepHandler = async ({ tripData, setDepartingFlightOptions }) => {
  try {
    if (!tripData.flightPreference || !tripData.lodgingPreference) {
      return {
        success: false,
        error: 'Please select both flight and lodging preferences',
      };
    }

    // Create a new chat session before sending the first message
    await createChatSession();

    // FORMAT: Here, we format the user selection to create a message that the LLM will understand and will
    // result in a response with a list of departing flight options

    // SEND: Now we Send to LLM
    const response = await sendChatMessage({
      message: `Budget preferences: Flight - ${tripData.flightPreference}, Lodging - ${tripData.lodgingPreference}`,
    });

    // INSPECT RESPONSE: Here is where we will check if the response is the structured output that we expect
    // we expect a response with departing flight options here and we update state if we get a good response
    setDepartingFlightOptions(SAMPLE_DEPARTING_FLIGHTS)
    const shouldAdvance = true; // If everything worked out

    console.log('Budget step response:', response);

    return { success: true, shouldAdvance };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process budget preferences',
    };
  }
};
