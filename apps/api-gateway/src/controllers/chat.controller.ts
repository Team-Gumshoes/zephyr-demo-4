import { Request, Response } from 'express';
import { chatAgent } from '../services/agents/chat-agent.service';
import { saveChatMessage, createChatSession } from '../services/chat.service';
import { ChatRequest, ChatResponse } from '../types/agents';

// ************* POST /chat/session - Create a new chat session ************
const createChatSessionHandler = async (req: Request, res: Response): Promise<void> => {
  const { supabase } = req;
  const {
    data: { id },
  } = await createChatSession({ supabase });

  // Set session ID in cookie
  res.cookie('chat_session_id', id, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
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
  await saveChatMessage({
    supabase,
    sessionId,
    role: 'user',
    content: { text: message },
  });
  
  // 3. Make request to agentAPI
  const chatRequest: ChatRequest = {
    messages: [{ type: 'human', content: message }],
    trip: req.body.trip,
  };

  const response: ChatResponse = await chatAgent.sendChat(chatRequest);

  console.log('^^^^^^^^ RESPONSE IN CHAT CONTROLLER ^^^^^^^^');
  console.log(response);

  // 4. Save AI response message to database
  const { data } = await saveChatMessage({
    supabase,
    sessionId,
    role: 'assistant',
    content: { text: JSON.stringify(response.data) },
  });
  console.log(data)

  // 5. Return the assistant response
  res.status(200).json(response);
};

export { chatMessageHandler, createChatSessionHandler };
