import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🎯 Seeding leaderboard data...')

  // Update existing users with random points
  const users = await prisma.user.findMany({
    where: { role: 'user' }
  })

  for (const user of users) {
    const points = Math.floor(Math.random() * 500) + 100
    await prisma.user.update({
      where: { id: user.id },
      data: { totalPoints: points }
    })
  }

  console.log(`✅ Updated ${users.length} users with points`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
