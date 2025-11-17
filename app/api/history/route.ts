import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select('*, activity(*)')
      .eq('user_id', parseInt(session.user.id))
      .order('id', { ascending: false })

    if (error) throw error

    const past = enrollments.filter(e => new Date(e.activity.date) < new Date())
    const upcoming = enrollments.filter(e => new Date(e.activity.date) >= new Date())

    return NextResponse.json({ past, upcoming, all: enrollments })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}
