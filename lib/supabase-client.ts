import { createClient } from '@supabase/supabase-js'

// Use service role key for admin operations (bypasses RLS, connects to correct database)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// TypeScript interfaces matching your Prisma schema
export interface User {
  id: number
  username: string
  email: string
  password: string
  role: string
  fullName?: string
  phoneNumber?: string
  isVerified: boolean
  verificationCode?: string
  verificationToken?: string
  tokenExpiry?: Date
  avatar?: string
  bio?: string
  linkedIn?: string
  github?: string
  twitter?: string
  skills?: string
  gpa?: number
  graduationYear?: number
  studentId?: string
  emailNotifications: boolean
  profileVisibility: string
  language: string
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  totalPoints: number
  attendanceRate: number
  organizationId?: number
  createdAt: Date
  updatedAt: Date
}

// Database operations that mimic Prisma API with field mapping
export const db = {
  users: {
    findUnique: async ({ where }: { where: { email?: string, id?: number } }) => {
      if (where.email) {
        const { data, error } = await supabase
          .from('users')
          .select(`
            id,
            username,
            email,
            password,
            role,
            full_name,
            phone_number,
            is_verified,
            verification_code,
            verification_token,
            token_expiry,
            avatar,
            bio,
            linked_in,
            github,
            twitter,
            skills,
            gpa,
            graduation_year,
            student_id,
            email_notifications,
            profile_visibility,
            language,
            two_factor_enabled,
            two_factor_secret,
            total_points,
            attendance_rate,
            organization_id,
            created_at,
            updated_at
          `)
          .eq('email', where.email)
          .single()
        
        // Map snake_case to camelCase
        if (data) {
          return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
            fullName: data.full_name,
            phoneNumber: data.phone_number,
            isVerified: data.is_verified,
            verificationCode: data.verification_code,
            verificationToken: data.verification_token,
            tokenExpiry: data.token_expiry,
            avatar: data.avatar,
            bio: data.bio,
            linkedIn: data.linked_in,
            github: data.github,
            twitter: data.twitter,
            skills: data.skills,
            gpa: data.gpa,
            graduationYear: data.graduation_year,
            studentId: data.student_id,
            emailNotifications: data.email_notifications,
            profileVisibility: data.profile_visibility,
            language: data.language,
            twoFactorEnabled: data.two_factor_enabled,
            twoFactorSecret: data.two_factor_secret,
            totalPoints: data.total_points,
            attendanceRate: data.attendance_rate,
            organizationId: data.organization_id,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          }
        }
        return null
      }
      if (where.id) {
        const { data, error } = await supabase
          .from('users')
          .select(`
            id,
            username,
            email,
            password,
            role,
            full_name,
            phone_number,
            is_verified,
            verification_code,
            verification_token,
            token_expiry,
            avatar,
            bio,
            linked_in,
            github,
            twitter,
            skills,
            gpa,
            graduation_year,
            student_id,
            email_notifications,
            profile_visibility,
            language,
            two_factor_enabled,
            two_factor_secret,
            total_points,
            attendance_rate,
            organization_id,
            created_at,
            updated_at
          `)
          .eq('id', where.id)
          .single()
        
        // Map snake_case to camelCase
        if (data) {
          return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
            fullName: data.full_name,
            phoneNumber: data.phone_number,
            isVerified: data.is_verified,
            verificationCode: data.verification_code,
            verificationToken: data.verification_token,
            tokenExpiry: data.token_expiry,
            avatar: data.avatar,
            bio: data.bio,
            linkedIn: data.linked_in,
            github: data.github,
            twitter: data.twitter,
            skills: data.skills,
            gpa: data.gpa,
            graduationYear: data.graduation_year,
            studentId: data.student_id,
            emailNotifications: data.email_notifications,
            profileVisibility: data.profile_visibility,
            language: data.language,
            twoFactorEnabled: data.two_factor_enabled,
            twoFactorSecret: data.two_factor_secret,
            totalPoints: data.total_points,
            attendanceRate: data.attendance_rate,
            organizationId: data.organization_id,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          }
        }
        return null
      }
      return null
    },
    create: async ({ data }: { data: Partial<User> }) => {
      // Map camelCase to snake_case for database
      const dbData: any = {}
      if (data.id) dbData.id = data.id
      if (data.username) dbData.username = data.username
      if (data.email) dbData.email = data.email
      if (data.password) dbData.password = data.password
      if (data.role) dbData.role = data.role
      if (data.fullName) dbData.full_name = data.fullName
      if (data.phoneNumber) dbData.phone_number = data.phoneNumber
      if (data.isVerified !== undefined) dbData.is_verified = data.isVerified
      if (data.verificationCode) dbData.verification_code = data.verificationCode
      if (data.verificationToken) dbData.verification_token = data.verificationToken
      if (data.tokenExpiry) dbData.token_expiry = data.tokenExpiry
      if (data.avatar) dbData.avatar = data.avatar
      if (data.bio) dbData.bio = data.bio
      if (data.linkedIn) dbData.linked_in = data.linkedIn
      if (data.github) dbData.github = data.github
      if (data.twitter) dbData.twitter = data.twitter
      if (data.skills) dbData.skills = data.skills
      if (data.gpa !== undefined) dbData.gpa = data.gpa
      if (data.graduationYear) dbData.graduation_year = data.graduationYear
      if (data.studentId) dbData.student_id = data.studentId
      if (data.emailNotifications !== undefined) dbData.email_notifications = data.emailNotifications
      if (data.profileVisibility) dbData.profile_visibility = data.profileVisibility
      if (data.language) dbData.language = data.language
      if (data.twoFactorEnabled !== undefined) dbData.two_factor_enabled = data.twoFactorEnabled
      if (data.twoFactorSecret) dbData.two_factor_secret = data.twoFactorSecret
      if (data.totalPoints !== undefined) dbData.total_points = data.totalPoints
      if (data.attendanceRate !== undefined) dbData.attendance_rate = data.attendanceRate
      if (data.organizationId) dbData.organization_id = data.organizationId
      if (data.createdAt) dbData.created_at = data.createdAt
      if (data.updatedAt) dbData.updated_at = data.updatedAt

      const { data: result, error } = await supabase
        .from('users')
        .insert(dbData)
        .select()
        .single()
      
      // Map back to camelCase
      if (result) {
        return {
          id: result.id,
          username: result.username,
          email: result.email,
          password: result.password,
          role: result.role,
          fullName: result.full_name,
          phoneNumber: result.phone_number,
          isVerified: result.is_verified,
          verificationCode: result.verification_code,
          verificationToken: result.verification_token,
          tokenExpiry: result.token_expiry,
          avatar: result.avatar,
          bio: result.bio,
          linkedIn: result.linked_in,
          github: result.github,
          twitter: result.twitter,
          skills: result.skills,
          gpa: result.gpa,
          graduationYear: result.graduation_year,
          studentId: result.student_id,
          emailNotifications: result.email_notifications,
          profileVisibility: result.profile_visibility,
          language: result.language,
          twoFactorEnabled: result.two_factor_enabled,
          twoFactorSecret: result.two_factor_secret,
          totalPoints: result.total_points,
          attendanceRate: result.attendance_rate,
          organizationId: result.organization_id,
          createdAt: result.created_at,
          updatedAt: result.updated_at
        }
      }
      return result
    },
    update: async ({ where, data }: { where: { email?: string, id?: number }, data: Partial<User> }) => {
      // Map camelCase to snake_case for database
      const dbData: any = {}
      if (data.username) dbData.username = data.username
      if (data.email) dbData.email = data.email
      if (data.password) dbData.password = data.password
      if (data.role) dbData.role = data.role
      if (data.fullName) dbData.full_name = data.fullName
      if (data.phoneNumber) dbData.phone_number = data.phoneNumber
      if (data.isVerified !== undefined) dbData.is_verified = data.isVerified
      if (data.verificationCode) dbData.verification_code = data.verificationCode
      if (data.verificationToken) dbData.verification_token = data.verificationToken
      if (data.tokenExpiry) dbData.token_expiry = data.tokenExpiry
      if (data.avatar) dbData.avatar = data.avatar
      if (data.bio) dbData.bio = data.bio
      if (data.linkedIn) dbData.linked_in = data.linkedIn
      if (data.github) dbData.github = data.github
      if (data.twitter) dbData.twitter = data.twitter
      if (data.skills) dbData.skills = data.skills
      if (data.gpa !== undefined) dbData.gpa = data.gpa
      if (data.graduationYear) dbData.graduation_year = data.graduationYear
      if (data.studentId) dbData.student_id = data.studentId
      if (data.emailNotifications !== undefined) dbData.email_notifications = data.emailNotifications
      if (data.profileVisibility) dbData.profile_visibility = data.profileVisibility
      if (data.language) dbData.language = data.language
      if (data.twoFactorEnabled !== undefined) dbData.two_factor_enabled = data.twoFactorEnabled
      if (data.twoFactorSecret) dbData.two_factor_secret = data.twoFactorSecret
      if (data.totalPoints !== undefined) dbData.total_points = data.totalPoints
      if (data.attendanceRate !== undefined) dbData.attendance_rate = data.attendanceRate
      if (data.organizationId) dbData.organization_id = data.organizationId
      if (data.updatedAt) dbData.updated_at = data.updatedAt

      let query = supabase.from('users').update(dbData)
      
      if (where.email) {
        query = query.eq('email', where.email)
      }
      if (where.id) {
        query = query.eq('id', where.id)
      }
      
      const { data: result, error } = await query.select().single()
      
      // Map back to camelCase
      if (result) {
        return {
          id: result.id,
          username: result.username,
          email: result.email,
          password: result.password,
          role: result.role,
          fullName: result.full_name,
          phoneNumber: result.phone_number,
          isVerified: result.is_verified,
          verificationCode: result.verification_code,
          verificationToken: result.verification_token,
          tokenExpiry: result.token_expiry,
          avatar: result.avatar,
          bio: result.bio,
          linkedIn: result.linked_in,
          github: result.github,
          twitter: result.twitter,
          skills: result.skills,
          gpa: result.gpa,
          graduationYear: result.graduation_year,
          studentId: result.student_id,
          emailNotifications: result.email_notifications,
          profileVisibility: result.profile_visibility,
          language: result.language,
          twoFactorEnabled: result.two_factor_enabled,
          twoFactorSecret: result.two_factor_secret,
          totalPoints: result.total_points,
          attendanceRate: result.attendance_rate,
          organizationId: result.organization_id,
          createdAt: result.created_at,
          updatedAt: result.updated_at
        }
      }
      return result
    }
  }
}
