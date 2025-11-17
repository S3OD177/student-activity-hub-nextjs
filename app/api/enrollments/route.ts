import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: parseInt(session.user.id) },
      include: {
        activity: true
      },
      orderBy: { enrolledAt: "desc" }
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Please login to enroll in activities" },
        { status: 401 }
      )
    }

    const { activityId } = await req.json()
    
    if (!activityId) {
      return NextResponse.json(
        { error: "Activity ID is required" },
        { status: 400 }
      )
    }

    const existing = await prisma.enrollment.findFirst({
      where: {
        userId: parseInt(session.user.id),
        activityId: parseInt(activityId)
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Already enrolled" },
        { status: 400 }
      )
    }

    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(activityId) },
      include: {
        _count: {
          select: { enrollments: true }
        }
      }
    })

    if (activity && activity.maxStudents > 0 && activity._count.enrollments >= activity.maxStudents) {
      return NextResponse.json(
        { error: "Activity is full" },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: parseInt(session.user.id),
        activityId: parseInt(activityId)
      }
    })

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error: any) {
    console.error("Error creating enrollment:", error)
    return NextResponse.json(
      { error: error.message || "Failed to enroll. Please try again." },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get("activityId")

    if (!activityId) {
      return NextResponse.json(
        { error: "Activity ID required" },
        { status: 400 }
      )
    }

    await prisma.enrollment.deleteMany({
      where: {
        userId: parseInt(session.user.id),
        activityId: parseInt(activityId)
      }
    })

    return NextResponse.json({ message: "Unenrolled successfully" })
  } catch (error) {
    console.error("Error deleting enrollment:", error)
    return NextResponse.json(
      { error: "Failed to unenroll" },
      { status: 500 }
    )
  }
}
