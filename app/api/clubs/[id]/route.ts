import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const club = await prisma.club.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
                email: true
              }
            }
          }
        },
        activities: {
          where: {
            date: { gte: new Date() }
          },
          include: {
            _count: {
              select: { enrollments: true }
            }
          },
          orderBy: { date: "asc" },
          take: 5
        },
        _count: {
          select: {
            memberships: true,
            activities: true
          }
        }
      }
    })

    if (!club) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 })
    }

    return NextResponse.json(club)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch club" }, { status: 500 })
  }
}
