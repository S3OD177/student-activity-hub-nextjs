import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js'
import bcrypt from "bcryptjs"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        try {
          // Query Supabase users table
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            throw new Error("User not found")
          }

          // Verify password with bcrypt
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error("Invalid password")
          }

          if (!user.is_verified) {
            throw new Error("Please verify your email first")
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.username,
            role: user.role,
          }
        } catch (error) {
          if (error instanceof Error) {
            throw error
          }
          throw new Error("Authentication failed")
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-development-only-change-in-production",
}
