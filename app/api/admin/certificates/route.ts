import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

// Issue certificate to a single enrollment
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
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

    // Check if activity is completed
    const activityDate = new Date(enrollment.activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      return NextResponse.json({ error: "Cannot issue certificate for future activity" }, { status: 400 })
    }

    // Update certificate status
    const { data: updated, error: updateError } = await supabase
      .from('enrollments')
      .update({
        certificate_issued: true,
        certificate_date: new Date().toISOString(),
        attended: true, // Mark as attended when issuing certificate
      })
      .eq('id', enrollmentId)
      .select()
      .single()

    if (updateError) throw updateError

    // Create notification for user
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: enrollment.user_id,
        title: "Certificate Issued",
        message: `Your certificate for "${enrollment.activity.title}" is now available!`,
        type: "badge",
        read: false,
      })

    if (notificationError) throw notificationError

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error issuing certificate:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Bulk issue certificates for an activity
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId } = await request.json()

    const { data: activity, error } = await supabase
      .from('activities')
      .select('*, enrollments(*, user(*))')
      .eq('id', activityId)
      .single()

    if (error) throw error

    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }

    // Check if activity is completed
    const activityDate = new Date(activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      return NextResponse.json({ error: "Cannot issue certificates for future activity" }, { status: 400 })
    }

    // Issue certificates to all enrollments (marks them as attended)
    const updates = await Promise.all(
      activity.enrollments.map(async (enrollment: any) => {
        // Update enrollment - mark as attended and issue certificate
        const { error: updateError } = await supabase
          .from('enrollments')
          .update({
            attended: true,
            certificate_issued: true,
            certificate_date: new Date().toISOString(),
          })
          .eq('id', enrollment.id)

        if (updateError) throw updateError

        // Create notification
        const { error: notificationError } = await supabase
          .from('notifications')
          .insert({
            user_id: enrollment.user_id,
            title: "Certificate Issued",
            message: `Your certificate for "${activity.title}" is now available!`,
            type: "badge",
            read: false,
          })

        if (notificationError) throw notificationError

        return enrollment
      })
    )

    return NextResponse.json({ 
      message: `Issued ${updates.length} certificates`,
      count: updates.length 
    })
  } catch (error) {
    console.error("Error issuing bulk certificates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
