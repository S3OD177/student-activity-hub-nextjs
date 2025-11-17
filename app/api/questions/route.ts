import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get("activityId")
  
  if (!activityId) return NextResponse.json({ error: "Activity ID required" }, { status: 400 })

  const { data: questions, error } = await supabase
    .from('event_questions')
    .select('*, user(username, full_name)')
    .eq('activity_id', parseInt(activityId))
    .order('created_at', { ascending: false })

  if (error) throw error
  return NextResponse.json(questions)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { activityId, question, answer, isFAQ } = await req.json()
  
  const { data: newQuestion, error } = await supabase
    .from('event_questions')
    .insert({
      activity_id: parseInt(activityId),
      user_id: parseInt(session.user.id),
      question,
      answer: answer || null,
      is_faq: isFAQ || false
    })
    .select()
    .single()

  if (error) throw error
  return NextResponse.json(newQuestion)
}
