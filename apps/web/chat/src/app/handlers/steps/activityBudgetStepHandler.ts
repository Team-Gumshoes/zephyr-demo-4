import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { ActivityResponseDataSchema } from '../schemas/activitiesResponseSchema';
import { SelfieSpotResponseDataSchema } from '../schemas/selfieSpotResponseSchema';
import { NaturalAttractionResponseDataSchema } from '../schemas/naturalAttractionResponseSchema';
import { EateryResponseDataSchema } from '../schemas/eateryResponseSchema';
import { TravelTipResponseDataSchema } from '../schemas/travelTipResponseSchema';
import { createChatRequest } from '../helpers/chatRequest';

export const activityBudgetStepHandler: StepHandler = async ({
  tripData,
  setActivityOptions,
  setNatureOptions,
  setEateryOptions,
  setSelfieSpotOptions,
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

    // Create all requests
    const activitiesRequest = createChatRequest('activities', tripData, chatMessages);
    const selfieSpotRequest = createChatRequest('selfieSpots', tripData, chatMessages);
    const naturalAttractionsRequest = createChatRequest(
      'naturalAttractions',
      tripData,
      chatMessages,
    );
    const eateriesRequest = createChatRequest('eateries', tripData, chatMessages);
    const travelTipsRequest = createChatRequest('travelTips', tripData, chatMessages);

    // Make requests sequentially
    const activitiesResponse = await sendChatMessage(activitiesRequest);
    const selfieSpotResponse = await sendChatMessage(selfieSpotRequest);
    const naturalAttractionsResponse = await sendChatMessage(naturalAttractionsRequest);
    const eateriesResponse = await sendChatMessage(eateriesRequest);
    const travelTipsResponse = await sendChatMessage(travelTipsRequest);

    // Parse activities response
    const activityResponseData = ActivityResponseDataSchema.safeParse(activitiesResponse.data);
    if (!activityResponseData.success) {
      console.error('Invalid activity response data:', activityResponseData.error.issues);
    } else if (activityResponseData.data.options) {
      setActivityOptions(activityResponseData.data.options);
    }

    // Parse selfie spots response
    const selfieSpotResponseData = SelfieSpotResponseDataSchema.safeParse(selfieSpotResponse.data);
    if (!selfieSpotResponseData.success) {
      console.error('Invalid selfie spot response data:', selfieSpotResponseData.error.issues);
    } else if (selfieSpotResponseData.data.options) {
      setSelfieSpotOptions(selfieSpotResponseData.data.options);
    }

    // Parse natural attractions response
    const naturalAttractionResponseData = NaturalAttractionResponseDataSchema.safeParse(
      naturalAttractionsResponse.data,
    );
    if (!naturalAttractionResponseData.success) {
      console.error(
        'Invalid natural attraction response data:',
        naturalAttractionResponseData.error.issues,
      );
    } else if (naturalAttractionResponseData.data.options) {
      setNatureOptions(naturalAttractionResponseData.data.options);
    }

    // Parse eateries response
    const eateryResponseData = EateryResponseDataSchema.safeParse(eateriesResponse.data);
    if (!eateryResponseData.success) {
      console.error('Invalid eatery response data:', eateryResponseData.error.issues);
    } else if (eateryResponseData.data.options) {
      setEateryOptions(eateryResponseData.data.options);
    }

    // Parse travel tips response
    const travelTipResponseData = TravelTipResponseDataSchema.safeParse(travelTipsResponse.data);
    if (!travelTipResponseData.success) {
      console.error('Invalid travel tip response data:', travelTipResponseData.error.issues);
    } else if (travelTipResponseData.data.options) {
      setTravelTips(travelTipResponseData.data.options);
    }

    setChatMessages([
      ...activitiesRequest.messages,
      activitiesResponse.messages[activitiesResponse.messages.length - 1],
    ]);

    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process activities budget preferences',
    };
  }
};
