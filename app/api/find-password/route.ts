import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Find the admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@studenthub.com' }
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin user not found' });
    }

    // Test multiple possible passwords
    const testPasswords = ['admin123', 'password', '123456', 'admin', 'user123'];
    const results = [];

    for (const password of testPasswords) {
      const isValid = await bcrypt.compare(password, admin.password);
      if (isValid) {
        results.push({ password, valid: true, working: '✅ THIS PASSWORD WORKS!' });
      } else {
        results.push({ password, valid: false });
      }
    }

    // Also test creating a new hash with admin123 to compare
    const newHash = await bcrypt.hash('admin123', 10);
    const newHashMatches = await bcrypt.compare('admin123', newHash);

    return NextResponse.json({
      userEmail: admin.email,
      storedHash: admin.password,
      testResults: results,
      newHashTest: {
        newHash: newHash,
        newHashMatches: newHashMatches
      }
    });

  } catch (error) {
    console.error('❌ Password test error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
