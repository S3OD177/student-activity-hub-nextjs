import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const department = searchParams.get("department")

    const clubs = await prisma.club.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } }
            ]
          } : {},
          department ? { department } : {}
        ]
      },
      include: {
        _count: {
          select: {
            memberships: true,
            activities: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(clubs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clubs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const club = await prisma.club.create({
      data: {
        name: data.name,
        description: data.description,
        department: data.department,
        logo: data.logo,
        leaderId: data.leaderId
      }
    })

    return NextResponse.json(club)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create club" }, { status: 500 })
  }
}
