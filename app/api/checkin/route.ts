import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { token } = await req.json()

    // Validate token
    const tokenData = await prisma.checkInToken.findUnique({
      where: { token }
    })

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    if (new Date() > tokenData.expiresAt) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    // Check if user is enrolled
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: parseInt(session.user.id),
        activityId: tokenData.activityId
      }
    })

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled in this activity" }, { status: 400 })
    }

    // Create or update attendance
    const attendance = await prisma.attendance.upsert({
      where: {
        enrollmentId: enrollment.id
      },
      update: {
        attended: true,
        checkInTime: new Date()
      },
      create: {
        enrollmentId: enrollment.id,
        attended: true,
        checkInTime: new Date()
      }
    })

    // Award points
    await prisma.user.update({
      where: { id: parseInt(session.user.id) },
      data: {
        totalPoints: { increment: 10 }
      }
    })

    return NextResponse.json({ success: true, attendance })
  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ error: "Failed to check in" }, { status: 500 })
  }
}
