import { Router } from 'express';
import { chatMessageHandler, createChatSessionHandler, deleteChatSessionHandler } from '../controllers/chat.controller';
import { extractSessionFromCookie } from '../middleware/chatSession.middleware';
import asyncError from '../middleware/asyncError.middleware';

const chatRouter: Router = Router();

// POST /chat/session - Create a new chat session
chatRouter.post('/api/chat/session', asyncError(createChatSessionHandler));

// POST /chat/message - Send a message and get LLM response
chatRouter.post('/api/chat/message', extractSessionFromCookie, asyncError(chatMessageHandler));

// DELETE /chat/session - Delete a chat session and clear cookie
chatRouter.delete('/api/chat/session', asyncError(deleteChatSessionHandler));

export default chatRouter;
