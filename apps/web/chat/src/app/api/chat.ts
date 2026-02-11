import { apiClient } from '../lib/api-client';
import type { ChatRequest, ChatResponse } from '@allorai/shared-types';

// Re-export shared types so existing imports from this file still work
export type { ChatRequest, ChatResponse } from '@allorai/shared-types';
export type {
  Message,
  FlightSegment,
  FlightLeg,
  FlightResults,
  FlightResponseData,
  ResponseData,
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
  const response = await apiClient.post<ChatResponse>('/chat/message', data);
  return response.data;
}
