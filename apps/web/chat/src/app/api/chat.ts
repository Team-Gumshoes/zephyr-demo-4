import { apiClient } from '../lib/api-client';
import {
  SAMPLE_ACTIVITIES_RESPONSE,
  SAMPLE_DEPARTING_FLIGHTS_RESPONSE,
  SAMPLE_HOTELS_RESPONSE,
  SAMPLE_RETURNING_FLIGHTS_RESPONSE,
  type ChatRequest,
  type ChatResponse,
  type ResponseData,
} from '@allorai/shared-types';

// TODO Fix the type here
export interface CreateSessionResponse {
  sessionId: string;
  createdAt: string;
}

// API sets cookie for chat_session_id
export async function createChatSession(): Promise<CreateSessionResponse> {
  const response = await apiClient.post<CreateSessionResponse>('/chat/session', {});
  return response.data;
}

export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await apiClient.post<ChatResponse>('/chat/message', data);
    return response.data;
  } catch (error) {
    if (process.env.NX_PUBLIC_USE_SAMPLE_DATA_ON_CHAT_ERROR === 'true') {
      console.error('Unsuccessful call to api-gateway. Returning SAMPLE data instead:');
      console.error(error);
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content: 'a sample response when API failed',
          },
        ],
        data: responseDataForStep(data),
        trip: data.trip,
        debug: [],
      };
    }
    throw error; // If not returning sample data, re-throw
  }
}

const responseDataForStep = ({ messages }: ChatRequest): ResponseData => {
  const humanMessage = messages[messages.length - 1];
  if (humanMessage.content.match(/outbound flights/i)) {
    return SAMPLE_DEPARTING_FLIGHTS_RESPONSE;
  } else if (humanMessage.content.match(/return flights/i)) {
    return SAMPLE_RETURNING_FLIGHTS_RESPONSE;
  } else if (humanMessage.content.match(/hotel/i)) {
    return SAMPLE_HOTELS_RESPONSE;
  } else if (humanMessage.content.match(/activities/i)) {
    return SAMPLE_ACTIVITIES_RESPONSE;
  }
  return SAMPLE_DEPARTING_FLIGHTS_RESPONSE; // Fallback if no matches
};
