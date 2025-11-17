import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const badges = await prisma.badge.findMany({
      include: {
        _count: {
          select: { userBadges: true }
        }
      }
    })
    return NextResponse.json(badges)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch badges" }, { status: 500 })
  }
}
