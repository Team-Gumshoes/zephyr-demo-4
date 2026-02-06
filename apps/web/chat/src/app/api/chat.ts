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

export async function sendChatMessage(
  data: ChatMessageRequest,
): Promise<ChatMessageResponse> {
  const response = await apiClient.post<ChatMessageResponse>(
    '/chat/message',
    data,
  );
  return response.data;
}
