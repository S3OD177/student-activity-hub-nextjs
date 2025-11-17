import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get enrollment trends (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    // Get enrollment trends (last 6 months) - simplified for Supabase
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('enrollment_date')
      .gte('enrollment_date', sixMonthsAgo.toISOString())

    // Group by month manually
    const enrollmentsByMonth = enrollments?.reduce((acc: any, enrollment) => {
      const month = new Date(enrollment.enrollment_date).toISOString().slice(0, 7)
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {}) || {}

    // Get activities by category - simplified for Supabase
    const { data: activities } = await supabase
      .from('activities')
      .select('category')

    const activitiesByCategory = activities?.reduce((acc: any, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + 1
      return acc
    }, {}) || {}

    // Get top activities by enrollment - simplified for Supabase
    const { data: allActivities } = await supabase
      .from('activities')
      .select('*, enrollments(id)')

    // Count enrollments and sort manually
    const topActivities = allActivities
      ?.map((activity: any) => ({
        ...activity,
        _count: { enrollments: activity.enrollments?.length || 0 }
      }))
      .sort((a: any, b: any) => b._count.enrollments - a._count.enrollments)
      .slice(0, 5) || []

    // Get user growth - simplified for Supabase
    const { data: users } = await supabase
      .from('users')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString())

    // Group by month manually
    const usersByMonth = users?.reduce((acc: any, user) => {
      const month = new Date(user.created_at).toISOString().slice(0, 7)
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {}) || {}

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
