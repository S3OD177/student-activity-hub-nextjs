import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*, user_interests(*)')
      .eq('id', parseInt(params.id))
      .single()

    if (error) throw error

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Users can only view their own profile unless they're admin
    if (session.user.id !== params.id && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Users can only update their own profile unless they're admin
    if (session.user.id !== params.id && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { username, email, fullName, phoneNumber, academicLevel, major } = body

    // Update user
    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({
        username,
        email,
        full_name: fullName,
        phone_number: phoneNumber,
      })
      .eq('id', parseInt(params.id))
      .select()
      .single()

    if (updateError) throw updateError

    // Update or create user interests
    if (academicLevel && major) {
      // Delete existing interests
      const { error: deleteError } = await supabase
        .from('user_interests')
        .delete()
        .eq('user_id', parseInt(params.id))
      
      if (deleteError) throw deleteError
      
      // Create new interests
      const { error: createError } = await supabase
        .from('user_interests')
        .insert({
          user_id: parseInt(params.id),
          academic_level: academicLevel,
          major,
        })
      
      if (createError) throw createError
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    )
  }
}
