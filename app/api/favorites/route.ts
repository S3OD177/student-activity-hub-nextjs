import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: parseInt(session.user.id) },
      include: {
        activity: {
          include: {
            _count: {
              select: { enrollments: true }
            }
          }
        }
      }
    })

    return NextResponse.json(favorites)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId } = await req.json()

    const favorite = await prisma.favorite.create({
      data: {
        userId: parseInt(session.user.id),
        activityId: parseInt(activityId)
      }
    })

    return NextResponse.json(favorite)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const activityId = searchParams.get("activityId")

    await prisma.favorite.deleteMany({
      where: {
        userId: parseInt(session.user.id),
        activityId: parseInt(activityId!)
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
