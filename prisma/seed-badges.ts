import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🏆 Seeding badges...')

  const badges = [
    {
      name: "First Step",
      description: "Enrolled in your first activity",
      icon: "🎯",
      criteria: "enroll_first",
      points: 10
    },
    {
      name: "Active Participant",
      description: "Enrolled in 5 activities",
      icon: "⭐",
      criteria: "enroll_5",
      points: 50
    },
    {
      name: "Super Active",
      description: "Enrolled in 10 activities",
      icon: "🌟",
      criteria: "enroll_10",
      points: 100
    },
    {
      name: "Perfect Attendance",
      description: "100% attendance rate",
      icon: "✅",
      criteria: "attendance_100",
      points: 75
    },
    {
      name: "Social Butterfly",
      description: "Connected with 10 students",
      icon: "🦋",
      criteria: "connections_10",
      points: 50
    },
    {
      name: "Reviewer",
      description: "Left 5 activity reviews",
      icon: "📝",
      criteria: "reviews_5",
      points: 30
    },
    {
      name: "Early Bird",
      description: "Enrolled in activity 1 week in advance",
      icon: "🐦",
      criteria: "early_enroll",
      points: 20
    },
    {
      name: "Dedicated Learner",
      description: "Completed 20 activities",
      icon: "🎓",
      criteria: "complete_20",
      points: 200
    }
  ]

  for (const badge of badges) {
    await prisma.badge.create({
      data: badge
    })
  }

  console.log(`✅ Created ${badges.length} badges`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding badges:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
