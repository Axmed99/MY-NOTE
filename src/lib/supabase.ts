import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ixvabxnfqxzlhtslvpdz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BmOijc6NT5Y5qTwoeZF0Aw_nao4tyay';

// Sanitize URL: Remove trailing slashes and /rest/v1 if present
const supabaseUrl = rawUrl?.trim().replace(/\/$/, '').replace(/\/rest\/v1$/, '');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Database features will be disabled.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
