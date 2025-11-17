import { createClient as createBrowserClient } from '@/utils/supabase/client'

// Simple authentication helper using official Supabase pattern
export const db = {
  // Sign in user - check against public.users table
  async signIn(email: string, password: string) {
    try {
      const supabase = createBrowserClient()
      
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
  query(table: string) {
    const supabase = createBrowserClient()
    return supabase.from(table)
  }
}
