import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { enrollmentIds, activityId } = await request.json()

    if (!Array.isArray(enrollmentIds)) {
      return NextResponse.json({ error: "Invalid enrollment IDs" }, { status: 400 })
    }

    // Get all enrollments for this activity
    const { data: allEnrollments, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('activity_id', activityId)

    if (error) throw error

    // Update attendance for all enrollments
    // Mark selected ones as attended, others as not attended
    await Promise.all(
      allEnrollments.map(enrollment =>
        supabase
          .from('enrollments')
          .update({
            attended: enrollmentIds.includes(enrollment.id)
          })
          .eq('id', enrollment.id)
      )
    )

    return NextResponse.json({
      message: `Attendance updated for ${enrollmentIds.length} student(s)`,
      count: enrollmentIds.length
    })
  } catch (error) {
    console.error("Error updating attendance:", error)
    return NextResponse.json(
      { error: "Failed to update attendance" },
      { status: 500 }
    )
  }
}
