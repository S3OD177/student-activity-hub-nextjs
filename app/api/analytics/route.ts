import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get enrollment trends (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const enrollmentsByMonth = await prisma.$queryRaw`
      SELECT 
        strftime('%Y-%m', enrollment_date) as month,
        COUNT(*) as count
      FROM enrollments
      WHERE enrollment_date >= ${sixMonthsAgo.toISOString()}
      GROUP BY month
      ORDER BY month
    `

    // Get activities by category
    const activitiesByCategory = await prisma.activity.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    })

    // Get top activities by enrollment
    const topActivities = await prisma.activity.findMany({
      take: 5,
      include: {
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: {
        enrollments: {
          _count: 'desc'
        }
      }
    })

    // Get user growth
    const usersByMonth = await prisma.$queryRaw`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count
      FROM users
      WHERE created_at >= ${sixMonthsAgo.toISOString()}
      GROUP BY month
      ORDER BY month
    `

    return NextResponse.json({
      enrollmentsByMonth,
      activitiesByCategory,
      topActivities,
      usersByMonth
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
