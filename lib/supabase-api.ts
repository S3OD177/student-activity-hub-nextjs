import { createClient } from '@supabase/supabase-js'

// Shared Supabase client for API routes (server-side only)
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)
