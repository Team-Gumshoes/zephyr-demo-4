import { apiClient } from '../lib/api-client';

// API deletes cookie and chat_session_id from the browser, not Supabase.
export async function deleteChatSession(): Promise<number> {
  const response = await apiClient.delete<number>('/chat/session', {});
  return response.status;
}
