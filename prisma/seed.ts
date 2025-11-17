import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@studenthub.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@studenthub.com',
      password: adminPassword,
      role: 'admin',
      fullName: 'Admin User',
      phoneNumber: '0500000000',
      isVerified: true,
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create Regular Users (Students)
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@studenthub.com' },
    update: {},
    create: {
      username: 'student',
      email: 'user@studenthub.com',
      password: userPassword,
      role: 'user',
      fullName: 'John Doe',
      phoneNumber: '0511111111',
      isVerified: true,
    },
  })
  console.log('✅ Regular user created:', user.email)

  // Create additional students
  const student2 = await prisma.user.upsert({
    where: { email: 'sarah@studenthub.com' },
    update: {},
    create: {
      username: 'sarah_smith',
      email: 'sarah@studenthub.com',
      password: userPassword,
      role: 'user',
      fullName: 'Sarah Smith',
      phoneNumber: '0522222222',
      isVerified: true,
    },
  })
  console.log('✅ Student 2 created:', student2.email)

  const student3 = await prisma.user.upsert({
    where: { email: 'ahmed@studenthub.com' },
    update: {},
    create: {
      username: 'ahmed_ali',
      email: 'ahmed@studenthub.com',
      password: userPassword,
      role: 'user',
      fullName: 'Ahmed Ali',
      phoneNumber: '0533333333',
      isVerified: true,
    },
  })
  console.log('✅ Student 3 created:', student3.email)

  const student4 = await prisma.user.upsert({
    where: { email: 'fatima@studenthub.com' },
    update: {},
    create: {
      username: 'fatima_hassan',
      email: 'fatima@studenthub.com',
      password: userPassword,
      role: 'user',
      fullName: 'Fatima Hassan',
      phoneNumber: '0544444444',
      isVerified: true,
    },
  })
  console.log('✅ Student 4 created:', student4.email)

  const student5 = await prisma.user.upsert({
    where: { email: 'omar@studenthub.com' },
    update: {},
    create: {
      username: 'omar_khalid',
      email: 'omar@studenthub.com',
      password: userPassword,
      role: 'user',
      fullName: 'Omar Khalid',
      phoneNumber: '0555555555',
      isVerified: true,
    },
  })
  console.log('✅ Student 5 created:', student5.email)

  // Create Club Leader User
  const leaderPassword = await bcrypt.hash('leader123', 10)
  const clubLeader = await prisma.user.upsert({
    where: { email: 'leader@studenthub.com' },
    update: {},
    create: {
      username: 'clubleader',
      email: 'leader@studenthub.com',
      password: leaderPassword,
      role: 'club_leader',
      fullName: 'Sarah Johnson',
      phoneNumber: '0522222222',
      isVerified: true,
    },
  })
  console.log('✅ Club leader created:', clubLeader.email)

  // Create User Interests for students
  await prisma.userInterest.create({
    data: {
      userId: user.id,
      academicLevel: 'Level 3',
      major: 'Computer Science',
    },
  })

  await prisma.userInterest.create({
    data: {
      userId: student2.id,
      academicLevel: 'Level 2',
      major: 'Information Systems',
    },
  })

  await prisma.userInterest.create({
    data: {
      userId: student3.id,
      academicLevel: 'Level 4',
      major: 'Computer Engineering',
    },
  })

  await prisma.userInterest.create({
    data: {
      userId: student4.id,
      academicLevel: 'Level 3',
      major: 'Computer Science',
    },
  })

  await prisma.userInterest.create({
    data: {
      userId: student5.id,
      academicLevel: 'Level 2',
      major: 'Information Systems',
    },
  })

  // Helper to get future dates
  const getFutureDate = (daysFromNow: number) => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    date.setHours(14, 0, 0, 0)
    return date
  }

  // Create Sample Activities
  const activities = [
    {
      title: 'Introduction to AI Workshop',
      description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning. Hands-on workshop with practical examples.',
      date: getFutureDate(5),
      location: 'Computer Science Building - Room 301',
      maxStudents: 30,
      academicLevel: 'Level 3',
      major: 'Computer Science',
      instructor: 'Dr. Sarah Ahmed',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Web Development Bootcamp',
      description: 'Intensive bootcamp covering HTML, CSS, JavaScript, React, and Node.js. Build real-world projects.',
      date: getFutureDate(10),
      location: 'IT Lab - Building A',
      maxStudents: 25,
      academicLevel: 'Level 2',
      major: 'Information Systems',
      instructor: 'Prof. Mohammed Ali',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Cybersecurity Fundamentals',
      description: 'Understanding network security, encryption, and ethical hacking basics. Certification preparation included.',
      date: getFutureDate(15),
      location: 'Engineering Hall',
      maxStudents: 40,
      academicLevel: 'Level 4',
      major: 'Computer Engineering',
      instructor: 'Dr. Fatima Hassan',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Web Development Workshop',
      description: 'Learn modern web development with React and Next.js',
      date: new Date('2024-12-15'),
      location: 'Computer Lab A',
      maxStudents: 30,
      academicLevel: 'Level 3',
      major: 'Computer Science',
      instructor: 'Dr. Ahmed Hassan',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'AI & Machine Learning Bootcamp',
      description: 'Introduction to artificial intelligence and machine learning concepts',
      date: new Date('2024-12-20'),
      location: 'Engineering Building - Room 201',
      maxStudents: 25,
      academicLevel: 'Level 4',
      major: 'Computer Science',
      instructor: 'Dr. Sarah Mohammed',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications with React Native',
      date: new Date('2024-12-18'),
      location: 'Computer Lab B',
      maxStudents: 20,
      academicLevel: 'Level 3',
      major: 'Computer Science',
      instructor: 'Prof. Omar Ali',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Data Science with Python',
      description: 'Data analysis, visualization, and machine learning using Python, Pandas, and Scikit-learn.',
      date: getFutureDate(10),
      location: 'Data Lab - Room 205',
      maxStudents: 35,
      academicLevel: 'Level 3',
      major: 'Computer Science',
      instructor: 'Dr. Layla Ibrahim',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Cloud Computing Workshop',
      description: 'Hands-on experience with AWS, Azure, and Google Cloud. Deploy scalable applications.',
      date: new Date('2025-04-10'),
      location: 'Tech Hub',
      maxStudents: 30,
      academicLevel: 'Level 4',
      major: 'Information Systems',
      instructor: 'Prof. Omar Khalid',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'UI/UX Design Masterclass',
      description: 'Learn design principles, user research, wireframing, and prototyping with Figma.',
      date: new Date('2025-04-15'),
      location: 'Design Studio',
      maxStudents: 25,
      academicLevel: 'Level 2',
      major: 'Computer Science',
      instructor: 'Designer Noor Saleh',
      category: 'Arts',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Blockchain Technology',
      description: 'Understanding blockchain, cryptocurrencies, and smart contracts. Build your first DApp.',
      date: new Date('2025-04-20'),
      location: 'Innovation Lab',
      maxStudents: 20,
      academicLevel: 'Level 4',
      major: 'Computer Engineering',
      instructor: 'Dr. Khalid Mansour',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Game Development with Unity',
      description: 'Create 2D and 3D games using Unity engine. Learn C# programming and game design.',
      date: new Date('2025-02-10'),
      location: 'Gaming Lab',
      maxStudents: 15,
      academicLevel: 'Level 3',
      major: 'Computer Science',
      instructor: 'Eng. Rami Yousef',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'DevOps and CI/CD',
      description: 'Master Docker, Kubernetes, Jenkins, and automated deployment pipelines.',
      date: new Date('2025-02-15'),
      location: 'Cloud Lab',
      maxStudents: 30,
      academicLevel: 'Level 4',
      major: 'Information Systems',
      instructor: 'Eng. Hassan Ali',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Digital Marketing Seminar',
      description: 'Learn about social media marketing and digital advertising',
      date: new Date('2024-12-28'),
      location: 'Business Building - Hall 1',
      maxStudents: 40,
      academicLevel: 'Level 2',
      major: 'Marketing',
      instructor: 'Ms. Layla Ibrahim',
      category: 'Business',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Cybersecurity Fundamentals',
      description: 'Introduction to cybersecurity principles and best practices',
      date: new Date('2024-12-30'),
      location: 'Computer Lab A',
      maxStudents: 25,
      academicLevel: 'Level 3',
      major: 'Computer Science',
      instructor: 'Dr. Khaled Mansour',
      category: 'Technology',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Graphic Design Workshop',
      description: 'Learn Adobe Creative Suite and design principles',
      date: new Date('2025-01-05'),
      location: 'Design Studio',
      maxStudents: 20,
      academicLevel: 'All Levels',
      major: 'Design',
      instructor: 'Prof. Noor Ahmed',
      category: 'Arts',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Public Speaking Masterclass',
      description: 'Improve your presentation and communication skills',
      date: new Date('2025-01-08'),
      location: 'Theater Hall',
      maxStudents: 30,
      academicLevel: 'All Levels',
      major: 'All Majors',
      instructor: 'Dr. Hassan Ali',
      category: 'Personal Development',
      imageUrl: null,
      status: 'active',
    },
    {
      title: 'Robotics Competition',
      description: 'Annual robotics competition for engineering students',
      date: new Date('2025-01-10'),
      location: 'Engineering Lab',
      maxStudents: 50,
      academicLevel: 'Level 3',
      major: 'Engineering',
      instructor: 'Dr. Youssef Karim',
      category: 'Engineering',
      imageUrl: null,
      status: 'active',
    },
  ]

  for (const activity of activities) {
    await prisma.activity.create({
      data: activity,
    })
  }
  console.log(`✅ Created ${activities.length} sample activities`)

  // Enroll students in activities
  const allActivities = await prisma.activity.findMany()
  const enrollments = [
    // John Doe enrollments
    { userId: user.id, activityId: allActivities[0].id, attended: true },
    { userId: user.id, activityId: allActivities[1].id, attended: true },
    { userId: user.id, activityId: allActivities[4].id, attended: false },
    { userId: user.id, activityId: allActivities[6].id, attended: false },
    
    // Sarah Smith enrollments
    { userId: student2.id, activityId: allActivities[0].id, attended: true },
    { userId: student2.id, activityId: allActivities[2].id, attended: true },
    { userId: student2.id, activityId: allActivities[3].id, attended: true },
    { userId: student2.id, activityId: allActivities[5].id, attended: false },
    { userId: student2.id, activityId: allActivities[7].id, attended: false },
    
    // Ahmed Ali enrollments
    { userId: student3.id, activityId: allActivities[1].id, attended: true },
    { userId: student3.id, activityId: allActivities[3].id, attended: true },
    { userId: student3.id, activityId: allActivities[8].id, attended: false },
    { userId: student3.id, activityId: allActivities[9].id, attended: false },
    
    // Fatima Hassan enrollments
    { userId: student4.id, activityId: allActivities[0].id, attended: true },
    { userId: student4.id, activityId: allActivities[2].id, attended: true },
    { userId: student4.id, activityId: allActivities[4].id, attended: true },
    { userId: student4.id, activityId: allActivities[6].id, attended: true },
    { userId: student4.id, activityId: allActivities[10].id, attended: false },
    
    // Omar Khalid enrollments
    { userId: student5.id, activityId: allActivities[1].id, attended: true },
    { userId: student5.id, activityId: allActivities[5].id, attended: true },
    { userId: student5.id, activityId: allActivities[7].id, attended: false },
    { userId: student5.id, activityId: allActivities[11].id, attended: false },
  ]

  for (const enrollment of enrollments) {
    await prisma.enrollment.create({
      data: enrollment,
    })
  }
  console.log(`✅ Created ${enrollments.length} sample enrollments`)

  console.log('\n🎉 Seed completed successfully!\n')
  console.log('📧 Demo Accounts:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('👨‍💼 ADMIN ACCOUNT:')
  console.log('   Email: admin@studenthub.com')
  console.log('   Password: admin123')
  console.log('')
  console.log('👤 STUDENT ACCOUNTS (All use password: user123):')
  console.log('   1. user@studenthub.com - John Doe')
  console.log('   2. sarah@studenthub.com - Sarah Smith')
  console.log('   3. ahmed@studenthub.com - Ahmed Ali')
  console.log('   4. fatima@studenthub.com - Fatima Hassan')
  console.log('   5. omar@studenthub.com - Omar Khalid')
  console.log('')
  console.log('🎯 CLUB LEADER ACCOUNT:')
  console.log('   Email: leader@studenthub.com')
  console.log('   Password: leader123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
