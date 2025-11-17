import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test Prisma connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Test if we can query users
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'healthy',
      prisma: 'connected',
      userCount,
      env: {
        hasPostgresUrl: !!process.env.POSTGRES_URL_NON_POOLING,
        hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        hasPostgresUrl: !!process.env.POSTGRES_URL_NON_POOLING,
        hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
      }
    }, { status: 500 });
  }
}
