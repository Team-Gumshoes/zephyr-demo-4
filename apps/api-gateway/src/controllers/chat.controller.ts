import { Request, Response } from 'express';
import { chatAgent } from '../services/agents/chat-agent.service';
import { saveChatMessage, createChatSession } from '../services/chat.service';
import type { ChatRequest, ChatResponse } from '@allorai/shared-types';
import logger from '../utils/logger';

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
  const {
    data: { id },
  } = await createChatSession({ supabase });

  // Set session ID in cookie
  res.cookie('chat_session_id', id, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Return the session ID to the front end
  res.status(201).json({
    id,
  });
};

// ************* POST /chat/message - Send a message and get LLM response ************
const chatMessageHandler = async (req: Request, res: Response): Promise<void> => {
  const {
    supabase,
    body: { sessionId },
  } = req;
  
  // 1. Parse and validate req.body
  if (!sessionId) {
    res.status(400).json({
      error: 'sessionId is required',
    });
    return;
  }

  /*
  TODO add zod validation for ALL of req.body
  Here is the ChatResponse shape:
  {
    messages: Message[];
    data: ResponseData | null;
    trip: Trip;
    debug: Message[];
  }
  And here is the Message shape:
  {
    type: "human" | "ai";
    content: string;
  }
  */
  const messages = req.body.messages;
  const message = messages[messages.length - 1];

  // 2. Save user message to database
  const {data: humanChatData} = await saveChatMessage({
    supabase,
    sessionId,
    role: 'user',
    content: { text: message },
  });
  logger.debug("Human chat request saved to database:")
  logger.debug(humanChatData)
  
  // 3. Make request to agentAPI
  const chatRequest: ChatRequest = {
    messages: [{ type: 'human', content: message }],
    trip: req.body.trip,
  };

  const response: ChatResponse = await chatAgent.sendChat(chatRequest);

  logger.debug('^^^^^^^^ RESPONSE IN CHAT CONTROLLER ^^^^^^^^');
  logger.debug(response);

  // 4. Save AI response message to database
  const { data: aiChatData } = await saveChatMessage({
    supabase,
    sessionId,
    role: 'assistant',
    content: { text: JSON.stringify(response.data) },
  });
  logger.debug("AI chat response saved to database:")
  logger.debug(aiChatData)

  // 5. Return the assistant response
  res.status(200).json(response);
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
