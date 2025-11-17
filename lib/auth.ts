import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔍 Auth attempt with email:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          throw new Error("Invalid credentials")
        }

        try {
          console.log('🔍 Looking up user in database...')
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          console.log('🔍 User found:', !!user)
          if (!user) {
            console.log('❌ User not found in database')
            throw new Error("User not found")
          }

          console.log('🔍 Comparing passwords...')
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          console.log('🔍 Password valid:', isPasswordValid)
          if (!isPasswordValid) {
            console.log('❌ Invalid password')
            throw new Error("Invalid password")
          }

          if (!user.isVerified) {
            console.log('❌ User not verified')
            throw new Error("Please verify your email first")
          }

          console.log('✅ Authentication successful for:', user.email)
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.username,
            role: user.role,
          }
        } catch (error) {
          console.error('❌ Auth error:', error)
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
  secret: process.env.NEXTAUTH_SECRET || 'bXlzdXBlcnNlY3JldGtleWZvcm5leHRhdXRoMjAyNGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MTIzNDU2Nzg5MA==',
}
