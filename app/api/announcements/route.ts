import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET() {
  try {
    const { data: announcements, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) throw error

    return NextResponse.json(announcements || [])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, priority } = await req.json()

    const { data: announcement, error } = await supabase
      .from('announcements')
      .insert({ title, content, priority })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(announcement)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', parseInt(id!))

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
