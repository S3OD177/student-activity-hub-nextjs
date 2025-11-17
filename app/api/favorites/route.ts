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

    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*, activity(*)')
      .eq('user_id', parseInt(session.user.id))

    if (error) throw error

    return NextResponse.json(favorites)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId } = await req.json()

    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        user_id: parseInt(session.user.id),
        activity_id: parseInt(activityId)
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(favorite)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get("activityId")

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', parseInt(session.user.id))
      .eq('activity_id', parseInt(activityId!))

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
