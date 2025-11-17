import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('🌱 Starting production seed...');

    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
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
    });
    console.log('✅ Admin user created:', admin.email);

    // Create Regular Users (Students)
    const userPassword = await bcrypt.hash('user123', 10);
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
    });
    console.log('✅ Regular user created:', user.email);

    // Create Club Leader
    const leaderPassword = await bcrypt.hash('leader123', 10);
    const leader = await prisma.user.upsert({
      where: { email: 'leader@studenthub.com' },
      update: {},
      create: {
        username: 'club_leader',
        email: 'leader@studenthub.com',
        password: leaderPassword,
        role: 'clubLeader',
        fullName: 'Club Leader',
        phoneNumber: '0522222222',
        isVerified: true,
      },
    });
    console.log('✅ Club leader created:', leader.email);

    return NextResponse.json({
      success: true,
      message: '🎉 Production database seeded successfully!',
      usersCreated: [
        { email: admin.email, role: admin.role },
        { email: user.email, role: user.role },
        { email: leader.email, role: leader.role },
      ],
      demoAccounts: [
        { email: 'admin@studenthub.com', password: 'admin123' },
        { email: 'user@studenthub.com', password: 'user123' },
        { email: 'leader@studenthub.com', password: 'leader123' },
      ],
    });

  } catch (error) {
    console.error('❌ Production seed error:', error);
    return NextResponse.json({ 
      error: 'Failed to seed production database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
