import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const membership = await prisma.clubMembership.create({
      data: {
        clubId: parseInt(params.id),
        userId: parseInt(session.user.id),
        status: "approved",
        role: "member"
      }
    })

    return NextResponse.json(membership)
  } catch (error) {
    return NextResponse.json({ error: "Failed to join club" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.clubMembership.deleteMany({
      where: {
        clubId: parseInt(params.id),
        userId: parseInt(session.user.id)
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to leave club" }, { status: 500 })
  }
}
