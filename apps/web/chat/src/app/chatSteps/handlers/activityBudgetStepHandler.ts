import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { ActivityResponseDataSchema } from '../schemas/activitiesResponseSchema';
import { SelfieSpotResponseDataSchema } from '../schemas/selfieSpotResponseSchema';
import { NaturalAttractionResponseDataSchema } from '../schemas/naturalAttractionResponseSchema';
import { EateryResponseDataSchema } from '../schemas/eateryResponseSchema';
import { createChatRequest } from '../helpers/chatRequest';

export const activityBudgetStepHandler: StepHandler = async ({
  tripData,
  setActivityOptions,
  setTravelTips,
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

    // Clear old activities before fetching new ones
    setActivityOptions([]);

    const activitiesRequest = createChatRequest('activities', tripData, chatMessages);
    const naturalAttractionsRequest = createChatRequest(
      'naturalAttractions',
      tripData,
      chatMessages,
    );
    const eateriesRequest = createChatRequest('eateries', tripData, chatMessages);
    const selfieSpotRequest = createChatRequest('selfieSpots', tripData, chatMessages);
    const travelTipsRequest = createChatRequest('travelTips', tripData, chatMessages);

    // Make requests sequentially
    // const activitiesResponse = await sendChatMessage(activitiesRequest);
    // const selfieSpotResponse = await sendChatMessage(selfieSpotRequest);
    // const naturalAttractionsResponse = await sendChatMessage(naturalAttractionsRequest);
    // const eateriesResponse = await sendChatMessage(eateriesRequest);
    // const travelTipsResponse = await sendChatMessage(travelTipsRequest);

    // Fire all requests in parallel; append to activityOptions as each resolves
    const [activitiesResponse] = await Promise.allSettled([
      sendChatMessage(activitiesRequest).then((response) => {
        const parsed = ActivityResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid activity response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => [...prev, ...options]);
        }
        return response;
      }),
      sendChatMessage(naturalAttractionsRequest).then((response) => {
        const parsed = NaturalAttractionResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid natural attraction response data:', parsed.error.issues);
          console.log(parsed);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => [...prev, ...options]);
        }
      }),
      sendChatMessage(eateriesRequest).then((response) => {
        const parsed = EateryResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid eatery response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => [...prev, ...options]);
        }
      }),
      sendChatMessage(selfieSpotRequest).then((response) => {
        const parsed = SelfieSpotResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid selfie spot response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => [...prev, ...options]);
        }
      }),
      sendChatMessage(travelTipsRequest).then((response) => {
        // The agent returns travel tips as plain text in the AI message, not as structured data
        const aiMessage = response.messages?.find((m) => m.type === 'ai');
        if (aiMessage?.content) {
          setTravelTips([
            {
              id: 'travel-tips',
              transportTips: '',
              whenToVisitTips: '',
              safetyTips: '',
              rawContent: aiMessage.content,
            },
          ]);
        }
      }),
    ]);

    if (activitiesResponse.status === 'fulfilled' && activitiesResponse.value) {
      const response = activitiesResponse.value;
      setChatMessages([
        ...activitiesRequest.messages,
        response.messages[response.messages.length - 1],
      ]);
    }

    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process activities budget preferences',
    };
  }
};
