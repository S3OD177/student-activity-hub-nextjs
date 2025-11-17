import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get basic club info with memberships
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('*, memberships(*, user(*))')
      .eq('id', parseInt(params.id))
      .single()

    if (clubError) throw clubError

    if (!club) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 })
    }

    // Get upcoming activities with enrollment counts
    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('*, enrollments(count)')
      .eq('club_id', parseInt(params.id))
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true })
      .limit(5)

    if (activitiesError) throw activitiesError

    // Get counts
    const { data: memberships } = await supabase
      .from('memberships')
      .select('id')
      .eq('club_id', parseInt(params.id))

    const { data: allActivities } = await supabase
      .from('activities')
      .select('id')
      .eq('club_id', parseInt(params.id))

    // Merge data into expected format
    const clubWithCounts = {
      ...club,
      activities: activities || [],
      _count: {
        memberships: memberships?.length || 0,
        activities: allActivities?.length || 0
      }
    }

    return NextResponse.json(clubWithCounts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch club" }, { status: 500 })
  }
}
