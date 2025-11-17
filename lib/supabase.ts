import { createClient } from '@supabase/supabase-js'

// Use Vercel's environment variables when available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxwhrrakccgtizuhjrnf.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Test function to check database connection
export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
      .single()
    
    if (error) {
      console.error('Database connection error:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, data }
  } catch (err) {
    console.error('Connection test failed:', err)
    return { success: false, error: err }
  }
}
