import { apiClient } from '../lib/api-client';

export interface ChatMessageRequest {
  message: string;
  sessionId?: string;
  conversationId?: string;
}

export interface ChatMessageResponse {
  id: string;
  message: string;
  timestamp: string;
  sessionId: string;
  conversationId: string;
}

// TODO Fix the type here
export interface CreateSessionResponse {
  sessionId: string;
  createdAt: string;
}

// API sets cookie for chat_session_id
export async function createChatSession(): Promise<CreateSessionResponse> {
  const response = await apiClient.post<CreateSessionResponse>(
    '/chat/session',
    {},
  );
  return response.data;
}

export async function sendChatMessage(
  data: ChatMessageRequest,
): Promise<ChatMessageResponse> {
  const response = await apiClient.post<ChatMessageResponse>(
    '/chat/message',
    data,
  );
  return response.data;
}
