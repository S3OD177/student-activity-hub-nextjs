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

    const { data: user, error } = await supabase
      .from('users')
      .select('email_notifications, profile_visibility, language, two_factor_enabled')
      .eq('id', parseInt(session.user.id))
      .single()

    if (error) throw error

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    
    const { data: user, error } = await supabase
      .from('users')
      .update({
        email_notifications: data.emailNotifications,
        profile_visibility: data.profileVisibility,
        language: data.language,
      })
      .eq('id', parseInt(session.user.id))
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
