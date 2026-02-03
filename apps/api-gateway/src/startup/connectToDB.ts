import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

let supabaseClient: SupabaseClient | null = null;

export const connectToSupabase = (): SupabaseClient => {
  if (supabaseClient) {
    return supabaseClient;
  }

  try {
    supabaseClient = createClient(config.SUPABASE_URL, config.SUPABASE_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: false,
      },
    });

    console.log('✅ Successfully connected to Supabase');
    return supabaseClient;
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error);
    throw error;
  }
};

export const getSupabaseClient = (): SupabaseClient | null => {
  return supabaseClient;
};
