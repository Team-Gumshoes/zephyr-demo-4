import { Request, Response } from 'express';
import { createChatMessage, createChatSession } from '../services/chat.service';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
};
// import { deleteChatSession } from '../services/chat.service';
// import { typescriptAgentsClient } from '../services/typescriptAgentsClient';

// ************* POST /chat/session - Create a new chat session (idempotent) ************
const createChatSessionHandler = async (req: Request, res: Response): Promise<void> => {
  const existingSessionId = req.cookies?.chat_session_id;

  // If a session cookie already exists, return it without creating a new one
  if (existingSessionId) {
    res.status(200).json({ id: existingSessionId });
    return;
  }

  const { supabase } = req;
  const { data } = await createChatSession({ supabase });

  // Set session ID in cookie
  res.cookie('chat_session_id', data.id, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Return the session ID to the front end
  res.status(201).json({
    id: data.id,
  });
};

// ************* POST /chat/message - Send a message and get LLM response ************
const chatMessageHandler = async (req: Request, res: Response): Promise<void> => {
  const {
    supabase,
    body: { sessionId, message },
  } = req;

  // Validate required fields
  if (!sessionId || !message) {
    res.status(400).json({
      error: 'sessionId and message are required',
    });
    return;
  }

  // Save user message to database
  await createChatMessage({
    supabase,
    sessionId,
    role: 'user',
    content: { text: message },
  });

  // const llmResponse = await typescriptAgentsClient.post('/coordinate', req.body );
  const llmResponse = `This is a mock response to: "${message}". The LLM integration will be implemented later.`;

  // Save assistant message to database
  const { data: modelMessage } = await createChatMessage({
    supabase,
    sessionId,
    role: 'assistant',
    content: { text: llmResponse },
  });

  // Return the assistant response
  res.status(200).json({
    message: llmResponse,
    id: modelMessage?.id,
    created_at: modelMessage?.created_at,
  });
};

// ************* DELETE /chat/session - Delete a chat session ************
const deleteChatSessionHandler = async (req: Request, res: Response): Promise<void> => {
  // const { supabase } = req;
  const sessionId = req.cookies?.chat_session_id;

  if (!sessionId) {
    res.status(400).json({
      error: 'No active session found',
    });
    return;
  }

  // Delete session from chat sessions table
  // await deleteChatSession({ supabase, sessionId });

  // Clear the session cookie
  res.clearCookie('chat_session_id', cookieOptions);

  res.status(200).json({ message: 'Session cleared' });
};

export { chatMessageHandler, createChatSessionHandler, deleteChatSessionHandler };
