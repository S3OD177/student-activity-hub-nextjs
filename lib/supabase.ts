import { createClient as createBrowserClient } from '@/utils/supabase/client'
import bcrypt from 'bcryptjs'

// Simple authentication helper using official Supabase pattern
export const db = {
  // Sign in user - check against public.users table and use Supabase Auth
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

      // Verify password with bcrypt
      const isPasswordValid = await bcrypt.compare(password, users.password)
      
      if (!isPasswordValid) {
        return { data: null, error: { message: 'Invalid password' } }
      }

      // Store user data in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify({
          id: users.id,
          email: users.email,
          role: users.role,
          username: users.username
        }))
      }

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
    } catch (err) {
      return { data: null, error: { message: 'Login failed' } }
    }
  },

  // Sign out
  async signOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
    }
    return { error: null }
  },

  // Get current user
  async getUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('currentUser')
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
