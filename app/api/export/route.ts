import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") // 'activities' or 'enrollments' or 'users'

    let data: any[] = []
    let filename = "export.csv"
    let headers: string[] = []

    if (type === "activities") {
      const { data: activities, error } = await supabase
        .from('activities')
        .select('*, enrollments(id)')

      if (error) throw error

      // Count enrollments manually
      data = activities?.map((activity: any) => ({
        ...activity,
        _count: { enrollments: activity.enrollments?.length || 0 }
      })) || []
      filename = "activities.csv"
      headers = ["ID", "Title", "Description", "Date", "Location", "Max Students", "Enrollments", "Category", "Instructor", "Status"]
      
      const csv = [
        headers.join(","),
        ...data.map(a => [
          a.id,
          `"${a.title}"`,
          `"${a.description}"`,
          new Date(a.date).toLocaleDateString(),
          `"${a.location}"`,
          a.maxStudents,
          a._count.enrollments,
          a.category || "General",
          `"${a.instructor || ''}"`,
          a.status
        ].join(","))
      ].join("\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}"`
        }
      })
    }

    if (type === "enrollments") {
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select('*, user(username, email, full_name), activity(title, date)')

      if (error) throw error

      data = enrollments || []
      filename = "enrollments.csv"
      headers = ["ID", "User", "Email", "Activity", "Activity Date", "Enrollment Date"]
      
      const csv = [
        headers.join(","),
        ...data.map(e => [
          e.id,
          `"${e.user.username}"`,
          e.user.email,
          `"${e.activity.title}"`,
          new Date(e.activity.date).toLocaleDateString(),
          new Date(e.enrollmentDate).toLocaleDateString()
        ].join(","))
      ].join("\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}"`
        }
      })
    }

    if (type === "users") {
      const { data: users, error } = await supabase
        .from('users')
        .select('id, username, email, full_name, role, created_at, enrollments(id)')

      if (error) throw error

      // Count enrollments manually
      data = users?.map((user: any) => ({
        ...user,
        fullName: user.full_name,
        createdAt: user.created_at,
        _count: { enrollments: user.enrollments?.length || 0 }
      })) || []
      filename = "users.csv"
      headers = ["ID", "Username", "Email", "Full Name", "Role", "Enrollments", "Joined Date"]
      
      const csv = [
        headers.join(","),
        ...data.map(u => [
          u.id,
          u.username,
          u.email,
          `"${u.fullName || ''}"`,
          u.role,
          u._count.enrollments,
          new Date(u.createdAt).toLocaleDateString()
        ].join(","))
      ].join("\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}"`
        }
      })
    }

    return NextResponse.json({ error: "Invalid export type" }, { status: 400 })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
