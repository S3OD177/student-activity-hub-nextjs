import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, email, role, full_name, is_verified, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(users || [])
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}
