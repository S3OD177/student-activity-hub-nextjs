import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET() {
  try {
    const { data: badges, error } = await supabase
      .from('badges')
      .select('*')

    if (error) throw error
    return NextResponse.json(badges)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch badges" }, { status: 500 })
  }
}
