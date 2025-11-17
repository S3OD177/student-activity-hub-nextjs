import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const enrollmentId = searchParams.get("enrollmentId")

    if (!enrollmentId) {
      return NextResponse.json({ error: "Enrollment ID required" }, { status: 400 })
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parseInt(enrollmentId) },
      include: {
        user: true,
        activity: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 })
    }

    // Check if user owns this enrollment
    if (enrollment.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if activity is completed and user attended
    const activityDate = new Date(enrollment.activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      return NextResponse.json({ error: "Activity not completed yet" }, { status: 400 })
    }

    if (!enrollment.attended) {
      return NextResponse.json({ error: "Certificate only available for attended activities" }, { status: 400 })
    }

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error("Error fetching certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { enrollmentId } = await request.json()

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        user: true,
        activity: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 })
    }

    // Check if user owns this enrollment
    if (enrollment.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update certificate issued status
    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        certificateIssued: true,
        certificateDate: new Date(),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error issuing certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
