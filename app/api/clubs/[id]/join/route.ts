import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: membership, error } = await supabase
      .from('memberships')
      .insert({
        club_id: parseInt(params.id),
        user_id: parseInt(session.user.id),
        status: "approved",
        role: "member"
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(membership)
  } catch (error) {
    return NextResponse.json({ error: "Failed to join club" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from('memberships')
      .delete()
      .eq('club_id', parseInt(params.id))
      .eq('user_id', parseInt(session.user.id))

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to leave club" }, { status: 500 })
  }
}
