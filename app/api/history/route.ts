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

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: parseInt(session.user.id) },
      include: {
        activity: {
          include: {
            reviews: {
              where: { userId: parseInt(session.user.id) }
            }
          }
        }
      },
      orderBy: { enrollmentDate: "desc" }
    })

    const past = enrollments.filter(e => new Date(e.activity.date) < new Date())
    const upcoming = enrollments.filter(e => new Date(e.activity.date) >= new Date())

    return NextResponse.json({ past, upcoming, all: enrollments })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}
