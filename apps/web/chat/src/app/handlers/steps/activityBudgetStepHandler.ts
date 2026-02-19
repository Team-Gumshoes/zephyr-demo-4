import { type ChatRequest, type ChatResponse, type Message } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { ActivityResponseDataSchema } from '../schemas/activitiesResponseSchema';

export const activityBudgetStepHandler: StepHandler = async ({
  tripData,
  setActivityOptions,
  chatMessages,
  setChatMessages,
}) => {
  try {
    if (!tripData.diningPreference || !tripData.activityPreference) {
      return {
        success: false,
        error: 'Please select both dining and activity preferences',
      };
    }

    const humanMessage: Message = {
      type: 'human',
      content: 'Given the trip data provided, please find activities for the trip.',
    };

    const request: ChatRequest = {
      messages: [...chatMessages, humanMessage],
      data: null,
      trip: tripData,
    };

    const response: ChatResponse = await sendChatMessage(request);
    console.log('response received in activityBudgetStepHAndler:');
    console.log(response);

    const parsedResponseData = ActivityResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid activity response data:', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid activity data from server',
      };
    }
    if (!parsedResponseData.data.options) {
      console.error("Missing 'options' from response in request for activities");
      return {
        success: false,
        error: 'Response from api-gateway did not contain the needed data',
      };
    }

    setChatMessages([...request.messages, response.messages[response.messages.length - 1]]); // TODO adding on ai response message, maybe ust pass response messages.. test this
    console.log("setting activities options")
    console.log(parsedResponseData.data.options)
    setActivityOptions(parsedResponseData.data.options);
    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process activities budget preferences',
    };
  }
};
