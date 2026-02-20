import { Request, Response } from 'express';
import { z } from 'zod';
import { chatAgent } from '../services/agents/chat-agent.service';
import { saveChatMessage, createChatSession } from '../services/chat.service';
import type { ChatRequest, ChatResponse } from '@allorai/shared-types';
import logger from '../utils/logger';

// Zod schema for request body validation
const MessageSchema = z.object({
  type: z.enum(['human', 'ai']),
  content: z.string(),
});

const TripDataSchema = z
  .object({
    origin: z.string().optional(),
    destination: z.string().optional(),
    departureDate: z.string().optional(),
    returnDate: z.string().optional(),
    preferences: z.string().optional(),
    budgetIncludes: z.array(z.string()).optional(),
    transportation: z.array(z.string()).optional(),
    flightPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    lodgingPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    diningPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    activityPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    currentStepIndex: z.number().optional(),
    budget: z.number().optional(),
    interests: z.array(z.string()).optional(),
    constraints: z.array(z.string()).optional(),
    departureFlight: z.any().optional(),
    returnFlight: z.any().optional(),
    hotel: z.any().optional(),
  })
  .passthrough();

const ChatMessageRequestSchema = z.object({
  sessionId: z.string(),
  messages: z.array(MessageSchema).min(1),
  trip: TripDataSchema,
  data: z.any().nullable().optional(),
});

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
  const { supabase } = req;

  // 1. Parse and validate req.body with Zod
  const parseResult = ChatMessageRequestSchema.safeParse(req.body);

  if (!parseResult.success) {
    logger.warn('Invalid chat message request body:');
    logger.debug(parseResult.error.issues);
    res.status(400).json({
      error: 'Invalid request body',
      details: parseResult.error.issues,
    });
    return;
  }

  const { sessionId, messages, trip } = parseResult.data;
  const humanChatMessage = messages[messages.length - 1].content;

  // 2. Save user message to database
  const { data: humanChatData } = await saveChatMessage({
    supabase,
    sessionId,
    role: 'user',
    content: { text: humanChatMessage },
  });
  logger.debug('Human chat request saved to database:');
  logger.debug(humanChatData);
  // 3. Make request to agentAPI
  const chatRequest: ChatRequest = {
    messages,
    trip: trip as ChatRequest['trip'],
  };

  logger.debug('+++++++++ REQUEST IN CHAT CONTROLLER +++++++++');
  logger.debug(chatRequest);

  const response: ChatResponse = await chatAgent.sendChat(chatRequest);

  logger.debug('^^^^^^^^ RESPONSE IN CHAT CONTROLLER ^^^^^^^^');
  logger.debug(response);

  // 4. Save AI response message to database
  const { data: aiChatData } = await saveChatMessage({
    supabase,
    sessionId,
    role: 'assistant',
    content: { text: response.messages[response.messages.length - 1].content },
  });
  logger.debug('AI chat response saved to database:');
  logger.debug(aiChatData);

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
