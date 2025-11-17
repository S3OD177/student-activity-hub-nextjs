import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const department = searchParams.get("department")

    const { data: clubs, error } = await supabase
      .from('clubs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(clubs || [])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clubs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const { data: club, error } = await supabase
      .from('clubs')
      .insert({
        name: data.name,
        description: data.description,
        department: data.department,
        logo: data.logo,
        leader_id: data.leaderId
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(club)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create club" }, { status: 500 })
  }
}
