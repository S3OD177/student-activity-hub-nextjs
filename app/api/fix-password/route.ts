import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Create proper hashes for all demo accounts
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    const leaderPassword = await bcrypt.hash('leader123', 10);

    // Update admin user
    const updatedAdmin = await prisma.user.update({
      where: { email: 'admin@studenthub.com' },
      data: { password: adminPassword }
    });

    // Update regular user
    const updatedUser = await prisma.user.update({
      where: { email: 'user@studenthub.com' },
      data: { password: userPassword }
    });

    // Update club leader
    const updatedLeader = await prisma.user.update({
      where: { email: 'leader@studenthub.com' },
      data: { password: leaderPassword }
    });

    return NextResponse.json({
      success: true,
      message: '✅ Passwords fixed successfully!',
      updatedUsers: [
        { email: updatedAdmin.email, hashStart: updatedAdmin.password.substring(0, 20) + '...' },
        { email: updatedUser.email, hashStart: updatedUser.password.substring(0, 20) + '...' },
        { email: updatedLeader.email, hashStart: updatedLeader.password.substring(0, 20) + '...' }
      ],
      testCredentials: [
        { email: 'admin@studenthub.com', password: 'admin123' },
        { email: 'user@studenthub.com', password: 'user123' },
        { email: 'leader@studenthub.com', password: 'leader123' }
      ]
    });

  } catch (error) {
    console.error('❌ Password fix error:', error);
    return NextResponse.json({ 
      error: 'Failed to fix passwords',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
