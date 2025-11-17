import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "user" },
      select: {
        id: true,
        username: true,
        fullName: true,
        avatar: true,
        totalPoints: true,
        _count: {
          select: {
            enrollments: true,
            badges: true
          }
        }
      },
      orderBy: { totalPoints: "desc" },
      take: 10
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
