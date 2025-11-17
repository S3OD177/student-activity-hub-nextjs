import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== "admin" && session.user.role !== "CLUB_LEADER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityId, expiresInHours = 24 } = await req.json()

    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + expiresInHours)

    const checkInToken = await prisma.checkInToken.create({
      data: {
        activityId: parseInt(activityId),
        token,
        expiresAt
      }
    })

    return NextResponse.json({ token: checkInToken.token, expiresAt })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
