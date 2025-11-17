import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 Testing password comparison...');
    
    // Find the admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@studenthub.com' }
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin user not found' });
    }

    // Test password comparison
    const testPassword = 'admin123';
    const isPasswordValid = await bcrypt.compare(testPassword, admin.password);

    return NextResponse.json({
      userFound: !!admin,
      userEmail: admin.email,
      passwordHashLength: admin.password.length,
      passwordHashStart: admin.password.substring(0, 20) + '...',
      testPassword: testPassword,
      isPasswordValid: isPasswordValid,
      isVerified: admin.isVerified,
      role: admin.role
    });

  } catch (error) {
    console.error('❌ Password test error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
