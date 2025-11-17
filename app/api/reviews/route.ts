import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase-api"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get("activityId")

    let query = supabase
      .from('reviews')
      .select('*, user(username, full_name)')
      .order('created_at', { ascending: false })

    if (activityId) {
      query = query.eq('activity_id', parseInt(activityId))
    }

    const { data: reviews, error } = await query

    if (error) throw error

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId, rating, comment } = await req.json()

    // Check if review exists first
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('activity_id', parseInt(activityId))
      .eq('user_id', parseInt(session.user.id))
      .limit(1)
      .single()

    let review
    if (existingReview) {
      // Update existing review
      const { data: updatedReview, error: updateError } = await supabase
        .from('reviews')
        .update({ rating, comment })
        .eq('id', existingReview.id)
        .select()
        .single()
      
      if (updateError) throw updateError
      review = updatedReview
    } else {
      // Create new review
      const { data: createdReview, error: createError } = await supabase
        .from('reviews')
        .insert({
          activity_id: parseInt(activityId),
          user_id: parseInt(session.user.id),
          rating,
          comment
        })
        .select()
        .single()
      
      if (createError) throw createError
      review = createdReview
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 })
  }
}
