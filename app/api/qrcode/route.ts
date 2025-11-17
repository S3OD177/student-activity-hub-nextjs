import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate QR code data (user ID encoded)
    const qrData = {
      userId: session.user.id,
      username: session.user.name,
      timestamp: Date.now()
    }

    const qrString = Buffer.from(JSON.stringify(qrData)).toString('base64')

    return NextResponse.json({ qrCode: qrString, data: qrData })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
