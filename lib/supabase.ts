import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zxwhrrakccgtizuhjrnf.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4d2hycmFrY2NndGl6dWhqcm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjc4NDMsImV4cCI6MjA3ODkwMzg0M30.UZludVyWvyD_l7h4N2LVKfDxl9oFrP8YxZ3mfTw-U6s'

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
