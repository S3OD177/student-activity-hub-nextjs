import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"
import { z } from "zod"

const activitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  location: z.string().min(1),
  maxStudents: z.number().optional(),
  academicLevel: z.string().optional(),
  major: z.string().optional(),
  instructor: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const academicLevel = searchParams.get("academicLevel")
    const major = searchParams.get("major")

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    let where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ]
    }

    if (status === "upcoming") {
      where.date = { gte: currentDate }
    } else if (status === "ended") {
      where.date = { lt: currentDate }
    }

    if (academicLevel) {
      where.academicLevel = academicLevel
    }

    if (major) {
      where.major = major
    }

    const { data: activities, error } = await supabase
      .from('activities')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error

    return NextResponse.json(activities || [])
  } catch (error) {
    console.error("Error fetching activities:", error)
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = activitySchema.parse(body)

    const { data: activity, error } = await supabase
      .from('activities')
      .insert({
        title: data.title,
        description: data.description,
        date: new Date(data.date).toISOString(),
        location: data.location,
        max_students: data.maxStudents || 0,
        academic_level: data.academicLevel,
        major: data.major,
        instructor: data.instructor,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating activity:", error)
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    )
  }
}
