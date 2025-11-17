import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get("activityId")
  
  if (!activityId) return NextResponse.json({ error: "Activity ID required" }, { status: 400 })

  const questions = await prisma.eventQuestion.findMany({
    where: { activityId: parseInt(activityId) },
    include: { user: { select: { username: true, fullName: true } } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(questions)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { activityId, question, answer, isFAQ } = await req.json()
  
  const newQuestion = await prisma.eventQuestion.create({
    data: {
      activityId: parseInt(activityId),
      userId: parseInt(session.user.id),
      question,
      answer: answer || null,
      isFAQ: isFAQ || false
    }
  })
  return NextResponse.json(newQuestion)
}
