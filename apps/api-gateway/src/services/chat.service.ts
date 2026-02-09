import { SupabaseClient } from '@supabase/supabase-js';

interface CreateChatSessionParams {
  supabase: SupabaseClient;
}

interface ChatSession {
  id: string;
}

interface CreateChatMessageParams {
  supabase: SupabaseClient;
  sessionId: string;
  role: 'user' | 'assistant';
  content: { text: string };
}

interface ChatMessage {
  id: string;
  content: { text: string };
  created_at: string;
}

export const createChatSession = async ({
  supabase,
}: CreateChatSessionParams): Promise<{
  data: ChatSession;
}> => {
  const { data, error } = await supabase.from('chat_sessions').insert({}).select('id').single();

  if (error) {
    throw error; // Throw Postgres Error
  }

  if (!data) {
    throw new Error('Unable to create chat session');
  }

  return { data };
};

export const createChatMessage = async ({
  supabase,
  sessionId,
  role,
  content,
}: CreateChatMessageParams): Promise<{
  data: ChatMessage | null;
}> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      role,
      content,
    })
    .select('id, content, created_at')
    .single();

  if (error) {
    throw error; // Throw Postgres Error
  }

  return { data };
};
