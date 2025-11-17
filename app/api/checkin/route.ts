import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { token } = await req.json()

    // Validate token
    const { data: tokenData, error: tokenError } = await supabase
      .from('check_in_tokens')
      .select('*')
      .eq('token', token)
      .single()

    if (tokenError) throw tokenError

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    if (new Date() > new Date(tokenData.expires_at)) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    // Check if user is enrolled
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', parseInt(session.user.id))
      .eq('activity_id', tokenData.activity_id)
      .single()

    if (enrollmentError) throw enrollmentError

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled in this activity" }, { status: 400 })
    }

    // Find existing attendance or create new one
    const { data: existingAttendance, error: attendanceError } = await supabase
      .from('attendances')
      .select('*')
      .eq('enrollment_id', enrollment.id)
      .single()

    // Handle attendance update or create
    let attendance
    if (existingAttendance) {
      const { data: updatedAttendance, error: updateError } = await supabase
        .from('attendances')
        .update({
          attended: true,
          check_in_time: new Date().toISOString()
        })
        .eq('id', existingAttendance.id)
        .select()
        .single()
      
      if (updateError) throw updateError
      attendance = updatedAttendance
    } else {
      const { data: createdAttendance, error: createError } = await supabase
        .from('attendances')
        .insert({
          enrollment_id: enrollment.id,
          attended: true,
          check_in_time: new Date().toISOString()
        })
        .select()
        .single()
      
      if (createError) throw createError
      attendance = createdAttendance
    }

    // Award points
    const { error: pointsError } = await supabase
      .from('users')
      .update({
        total_points: supabase.rpc('increment', { amount: 10 })
      })
      .eq('id', parseInt(session.user.id))

    if (pointsError) {
      // If increment function doesn't exist, try manual update
      const { data: currentUser } = await supabase
        .from('users')
        .select('total_points')
        .eq('id', parseInt(session.user.id))
        .single()
      
      await supabase
        .from('users')
        .update({
          total_points: (currentUser?.total_points || 0) + 10
        })
        .eq('id', parseInt(session.user.id))
    }

    return NextResponse.json({ success: true, attendance })
  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ error: "Failed to check in" }, { status: 500 })
  }
}
