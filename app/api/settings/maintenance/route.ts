import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const setting = await prisma.systemSettings.findUnique({
      where: { key: "maintenance_mode" }
    })
    
    return NextResponse.json({ enabled: setting?.value === "true" })
  } catch (error) {
    return NextResponse.json({ enabled: false })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { enabled } = await req.json()

    await prisma.systemSettings.upsert({
      where: { key: "maintenance_mode" },
      update: { value: enabled ? "true" : "false" },
      create: { key: "maintenance_mode", value: enabled ? "true" : "false" }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update maintenance mode" }, { status: 500 })
  }
}
