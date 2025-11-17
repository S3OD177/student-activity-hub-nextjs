import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        badges(*, badge:badges(*)),
        enrollments(count),
        connections(count),
        reviews(count)
      `)
      .eq('id', parseInt(session.user.id))
      .single()

    if (error) throw error

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    
    const { data: user, error } = await supabase
      .from('users')
      .update({
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        bio: data.bio,
        avatar: data.avatar,
        linkedin: data.linkedIn,
        github: data.github,
        twitter: data.twitter,
        skills: data.skills,
        gpa: data.gpa ? parseFloat(data.gpa) : null,
        graduation_year: data.graduationYear ? parseInt(data.graduationYear) : null,
        student_id: data.studentId,
      })
      .eq('id', parseInt(session.user.id))
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
