import { Router, Request, Response, NextFunction } from 'express';
import { getSupabaseClient } from '../startup/connectToDB.js';

const router: Router = Router();

// POST /session - Create a new chat session
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      res.status(500).json({ 
        error: 'Database connection not available' 
      });
      return
    }

    // Create a new session in the chat_sessions table
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({})
      .select('id')
      .single();

    if (error) {
      console.error('Error creating chat session:', error);
      res.status(500).json({ 
        error: 'Failed to create session',
        details: error.message 
      });
      return
    }

    // Return the session ID to the front end
    res.status(201).json({ 
      id: data.id 
    });
  } catch (error) {
    console.error('Unexpected error creating session:', error);
    next(error);
  }
});

export default router