import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Issue certificate to a single enrollment
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
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

    // Check if activity is completed
    const activityDate = new Date(enrollment.activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      return NextResponse.json({ error: "Cannot issue certificate for future activity" }, { status: 400 })
    }

    // Update certificate status
    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        certificateIssued: true,
        certificateDate: new Date(),
        attended: true, // Mark as attended when issuing certificate
      },
    })

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: enrollment.userId,
        title: "Certificate Issued",
        message: `Your certificate for "${enrollment.activity.title}" is now available!`,
        type: "badge",
        read: false,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error issuing certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Bulk issue certificates for an activity
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId } = await request.json()

    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: {
        enrollments: {
          where: {
            certificateIssued: false,
          },
          include: {
            user: true,
          },
        },
      },
    })

    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }

    // Check if activity is completed
    const activityDate = new Date(activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      return NextResponse.json({ error: "Cannot issue certificates for future activity" }, { status: 400 })
    }

    // Issue certificates to all enrollments (marks them as attended)
    const updates = await Promise.all(
      activity.enrollments.map(async (enrollment) => {
        // Update enrollment - mark as attended and issue certificate
        await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: {
            attended: true,
            certificateIssued: true,
            certificateDate: new Date(),
          },
        })

        // Create notification
        await prisma.notification.create({
          data: {
            userId: enrollment.userId,
            title: "Certificate Issued",
            message: `Your certificate for "${activity.title}" is now available!`,
            type: "badge",
            read: false,
          },
        })

        return enrollment
      })
    )

    return NextResponse.json({ 
      message: `Issued ${updates.length} certificates`,
      count: updates.length 
    })
  } catch (error) {
    console.error("Error issuing bulk certificates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
