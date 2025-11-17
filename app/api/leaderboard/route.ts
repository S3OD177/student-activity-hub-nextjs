import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-api"

export async function GET() {
  try {
    // Get basic users with points
    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, full_name, avatar, total_points')
      .eq('role', 'user')
      .order('total_points', { ascending: false })
      .limit(10)

    if (error) throw error

    // Get counts for each user
    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('id')
          .eq('user_id', user.id)

        const { data: badges } = await supabase
          .from('user_badges')
          .select('id')
          .eq('user_id', user.id)

        return {
          ...user,
          fullName: user.full_name,
          totalPoints: user.total_points,
          _count: {
            enrollments: enrollments?.length || 0,
            badges: badges?.length || 0
          }
        }
      })
    )

    return NextResponse.json(usersWithCounts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
