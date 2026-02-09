import { Request, Response } from 'express';
import { createChatMessage, createChatSession } from '../services/chat.service';
// import { typescriptAgentsClient } from '../services/typescriptAgentsClient';

// ************* POST /chat/session - Create a new chat session ************
const createChatSessionHandler = async (req: Request, res: Response): Promise<void> => {
  const { supabase } = req;
  const { data } = await createChatSession({ supabase });

  // Set session ID in cookie
  res.cookie('chat_session_id', data.id, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Return the session ID to the front end
  res.status(201).json({
    id: data.id,
  });
};

// ************* POST /chat/message - Send a message and get LLM response ************
const chatMessageHandler = async (req: Request, res: Response): Promise<void> => {
  const { supabase, body: { sessionId, message } } = req;

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

export { chatMessageHandler, createChatSessionHandler };
