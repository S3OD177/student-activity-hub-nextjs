import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
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

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString()

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
        verificationCode,
        isVerified: true,
      }
    })

    if (academicLevel && major) {
      await prisma.userInterest.create({
        data: {
          userId: user.id,
          academicLevel,
          major,
        }
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
