import { createClient } from '@supabase/supabase-js'

// Shared Supabase client for API routes
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
