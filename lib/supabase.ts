import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zxwhrrakccgtizuhjrnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4d2hycmFrY2NndGl6dWhqcm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDc3NjYsImV4cCI6MjA3ODkyMzc2Nn0.YQ7Y5qH5qH5qH5qH5qH5qOqH5qH5qH5qH5qH5qH5qH5qH5qH5qH5q'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Test function to check database connection
export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .single()
    
    if (error) {
      console.error('Database connection error:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  } catch (err) {
    console.error('Connection test failed:', err)
    return { success: false, error: err }
  }
}
