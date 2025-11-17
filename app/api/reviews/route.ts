import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get("activityId")

    const reviews = await prisma.review.findMany({
      where: activityId ? { activityId: parseInt(activityId) } : {},
      include: {
        user: {
          select: {
            username: true,
            fullName: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

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

    const review = await prisma.review.upsert({
      where: {
        activityId_userId: {
          activityId: parseInt(activityId),
          userId: parseInt(session.user.id)
        }
      },
      update: { rating, comment },
      create: {
        activityId: parseInt(activityId),
        userId: parseInt(session.user.id),
        rating,
        comment
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 })
  }
}
