import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      include: {
        badges: {
          include: { badge: true }
        },
        _count: {
          select: {
            enrollments: true,
            connections: true,
            reviews: true
          }
        }
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    
    const user = await prisma.user.update({
      where: { id: parseInt(session.user.id) },
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        avatar: data.avatar,
        linkedIn: data.linkedIn,
        github: data.github,
        twitter: data.twitter,
        skills: data.skills,
        gpa: data.gpa ? parseFloat(data.gpa) : null,
        graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
        studentId: data.studentId,
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
