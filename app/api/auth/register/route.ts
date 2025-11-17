import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-api"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  academicLevel: z.string().optional(),
  major: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, email, password, fullName, phoneNumber, academicLevel, major } = registerSchema.parse(body)

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},username.eq.${username}`)
      .limit(1)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString()

    const { data: user, error: createError } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password: hashedPassword,
        full_name: fullName,
        phone_number: phoneNumber,
        verification_code: verificationCode,
        is_verified: true,
      })
      .select()
      .single()

    if (createError) throw createError

    if (academicLevel && major) {
      await supabase
        .from('user_interests')
        .insert({
          user_id: user.id,
          academic_level: academicLevel,
          major,
        })
    }

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }
    
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
