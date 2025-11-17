import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Simple Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions - using public.users table directly (not auth.users)
export const db = {
  // Sign in user - check against public.users table
  async signIn(email: string, password: string) {
    try {
      // Query public.users table directly
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !users) {
        return { data: null, error: { message: 'User not found' } }
      }

      // For demo purposes, accept the password as-is
      // In production, you'd verify the bcrypt hash
      const validPasswords: Record<string, string> = {
        'admin@studenthub.com': 'admin123',
        'user@studenthub.com': 'user123',
        'leader@studenthub.com': 'leader123'
      }

      if (validPasswords[email] === password) {
        return { 
          data: { 
            user: {
              id: users.id,
              email: users.email,
              role: users.role,
              username: users.username
            }
          }, 
          error: null 
        }
      } else {
        return { data: null, error: { message: 'Invalid password' } }
      }
    } catch (err) {
      return { data: null, error: { message: 'Login failed' } }
    }
  },

  // Sign out
  async signOut() {
    return { error: null }
  },

  // Get current user (from session storage for now)
  async getUser() {
    if (typeof window !== 'undefined') {
      const userStr = sessionStorage.getItem('currentUser')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },

  // Database queries
  async query(table: string) {
    return supabase.from(table)
  }
}

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
