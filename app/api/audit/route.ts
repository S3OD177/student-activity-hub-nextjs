import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action")
  const entityType = searchParams.get("entityType")
  const limit = parseInt(searchParams.get("limit") || "50")

  const where: any = {}
  if (action) where.action = action
  if (entityType) where.entityType = entityType

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit
  })

  return NextResponse.json(logs)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { action, entityType, entityId, details } = await req.json()

  const log = await prisma.auditLog.create({
    data: {
      userId: parseInt(session.user.id),
      action,
      entityType,
      entityId: entityId ? parseInt(entityId) : null,
      details: details ? JSON.stringify(details) : null
    }
  })

  return NextResponse.json(log)
}
