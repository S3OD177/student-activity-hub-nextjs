import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const enrollmentId = searchParams.get("enrollmentId")

    if (!enrollmentId) {
      return NextResponse.json({ error: "Enrollment ID required" }, { status: 400 })
    }

    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .select('*, user(*), activity(*)')
      .eq('id', parseInt(enrollmentId))
      .single()

    if (error) throw error

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 })
    }

    // Check if user owns this enrollment
    if (enrollment.user_id !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if activity is completed and user attended
    const activityDate = new Date(enrollment.activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      return NextResponse.json({ error: "Activity not completed yet" }, { status: 400 })
    }

    if (!enrollment.attended) {
      return NextResponse.json({ error: "Certificate only available for attended activities" }, { status: 400 })
    }

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error("Error fetching certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { enrollmentId } = await request.json()

    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .select('*, user(*), activity(*)')
      .eq('id', enrollmentId)
      .single()

    if (error) throw error

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 })
    }

    // Check if user owns this enrollment
    if (enrollment.user_id !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update certificate issued status
    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        certificate_issued: true,
        certificate_date: new Date().toISOString(),
      })
      .eq('id', enrollmentId)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error("Error issuing certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
