import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

// POST /chat/session - Create a new chat session
router.post(
  '/session',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Create a new session in the chat_sessions table
      const { data, error } = await req.supabase
        .from('chat_sessions')
        .insert({})
        .select('id')
        .single();

      if (error) {
        console.error('Error creating chat session:', error);
        res.status(500).json({
          error: 'Failed to create session',
          details: error.message,
        });
        return;
      }

      // Return the session ID to the front end
      res.status(201).json({
        id: data.id,
      });
    } catch (error) {
      console.error('Unexpected error creating session:', error);
      next(error);
    }
  },
);

// POST /chat/message - Send a message and get LLM response
router.post(
  '/message',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { session_id, message } = req.body;

      // Validate required fields
      if (!session_id || !message) {
        res.status(400).json({
          error: 'session_id and message are required',
        });
        return;
      }

      // Save user message to database
      const { error: userMessageError } = await req.supabase
        .from('chat_messages')
        .insert({
          session_id,
          role: 'user',
          content: { text: message },
        });

      if (userMessageError) {
        console.error('Error saving user message:', userMessageError);
        res.status(500).json({
          error: 'Failed to save user message',
          details: userMessageError.message,
        });
        return;
      }

      // Generate mock LLM response
      const mockLLMResponse = `This is a mock response to: "${message}". The LLM integration will be implemented later.`;

      // Save assistant message to database
      const { data: assistantMessage, error: assistantMessageError } =
        await req.supabase
          .from('chat_messages')
          .insert({
            session_id,
            role: 'assistant',
            content: { text: mockLLMResponse },
          })
          .select('id, content, created_at')
          .single();

      if (assistantMessageError) {
        console.error('Error saving assistant message:', assistantMessageError);
        res.status(500).json({
          error: 'Failed to save assistant message',
          details: assistantMessageError.message,
        });
        return;
      }

      // Return the assistant response
      res.status(200).json({
        message: mockLLMResponse,
        id: assistantMessage.id,
        created_at: assistantMessage.created_at,
      });
    } catch (error) {
      console.error('Unexpected error processing message:', error);
      next(error);
    }
  },
);

export default router;
