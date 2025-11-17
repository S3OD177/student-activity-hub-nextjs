import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🏫 Seeding clubs...')

  const clubs = [
    {
      name: "Computer Science Club",
      description: "A community for CS students to collaborate on projects, learn new technologies, and participate in hackathons.",
      department: "Computer Science",
      logo: null
    },
    {
      name: "Robotics Club",
      description: "Build and program robots, compete in competitions, and explore the world of automation and AI.",
      department: "Engineering",
      logo: null
    },
    {
      name: "Business Leaders Society",
      description: "Develop leadership skills, network with professionals, and learn about entrepreneurship and business strategy.",
      department: "Business",
      logo: null
    },
    {
      name: "Photography Club",
      description: "Capture moments, learn photography techniques, and showcase your work in exhibitions.",
      department: "Arts",
      logo: null
    },
    {
      name: "Debate Society",
      description: "Improve public speaking, critical thinking, and argumentation skills through competitive debates.",
      department: "General",
      logo: null
    },
    {
      name: "Environmental Action Group",
      description: "Promote sustainability, organize clean-up drives, and raise awareness about environmental issues.",
      department: "Science",
      logo: null
    },
    {
      name: "Music & Arts Collective",
      description: "Express yourself through music, art, and performance. All skill levels welcome!",
      department: "Arts",
      logo: null
    },
    {
      name: "Sports & Fitness Club",
      description: "Stay active, participate in sports tournaments, and promote healthy living on campus.",
      department: "General",
      logo: null
    }
  ]

  for (const club of clubs) {
    await prisma.club.create({
      data: club
    })
  }

  console.log(`✅ Created ${clubs.length} clubs`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding clubs:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
