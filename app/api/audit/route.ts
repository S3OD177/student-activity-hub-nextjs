import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action")
  const entityType = searchParams.get("entityType")
  const limit = parseInt(searchParams.get("limit") || "50")

  let query = supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  // Apply filters
  if (action) query = query.eq('action', action)
  if (entityType) query = query.eq('entity_type', entityType)

  const { data: logs, error } = await query

  if (error) throw error

  return NextResponse.json(logs)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { action, entityType, entityId, details } = await req.json()

  const { data: log, error } = await supabase
    .from('audit_logs')
    .insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      user_id: parseInt(session.user.id)
    })
    .select()
    .single()

  if (error) throw error

  return NextResponse.json(log)
}
