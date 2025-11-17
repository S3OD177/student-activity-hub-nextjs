import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select('*, activity(*)')
      .eq('user_id', parseInt(session.user.id))
      .order('enrolled_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Please login to enroll in activities" },
        { status: 401 }
      )
    }

    const { activityId } = await req.json()
    
    if (!activityId) {
      return NextResponse.json(
        { error: "Activity ID is required" },
        { status: 400 }
      )
    }

    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', parseInt(session.user.id))
      .eq('activity_id', parseInt(activityId))
      .limit(1)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "Already enrolled" },
        { status: 400 }
      )
    }

    const { data: activity, error: activityError } = await supabase
      .from('activities')
      .select('*, enrollments(count)')
      .eq('id', parseInt(activityId))
      .single()

    if (activityError) throw activityError

    if (activity && activity.max_students > 0 && activity.enrollments && activity.enrollments.length >= activity.max_students) {
      return NextResponse.json(
        { error: "Activity is full" },
        { status: 400 }
      )
    }

    const { data: enrollment, error: createError } = await supabase
      .from('enrollments')
      .insert({
        user_id: parseInt(session.user.id),
        activity_id: parseInt(activityId)
      })
      .select()
      .single()

    if (createError) throw createError

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error: any) {
    console.error("Error creating enrollment:", error)
    return NextResponse.json(
      { error: error.message || "Failed to enroll. Please try again." },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get("activityId")

    if (!activityId) {
      return NextResponse.json(
        { error: "Activity ID required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('user_id', parseInt(session.user.id))
      .eq('activity_id', parseInt(activityId))

    if (error) throw error

    return NextResponse.json({ message: "Unenrolled successfully" })
  } catch (error) {
    console.error("Error deleting enrollment:", error)
    return NextResponse.json(
      { error: "Failed to unenroll" },
      { status: 500 }
    )
  }
}
