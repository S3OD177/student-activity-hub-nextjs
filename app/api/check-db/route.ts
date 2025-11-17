import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Force dynamic route behavior
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = new PrismaClient();
    
    // Test basic connection
    await prisma.$connect();
    
    // Check if users table exists
    const result = await prisma.$queryRaw<{table_name: string}[]>`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users'`;
    
    // Get database info
    const dbInfo = await prisma.$queryRaw<{database: string, user: string, version: string}[]>`SELECT current_database() as database, current_user() as user, version() as version`;
    
    // List all tables
    const allTables = await prisma.$queryRaw<{table_name: string}[]>`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      status: 'success',
      message: '✅ Database connection successful!',
      connected: true,
      usersTableExists: result.length > 0,
      databaseInfo: dbInfo[0],
      environment: process.env.NODE_ENV || 'development',
      databaseUrl: process.env.POSTGRES_PRISMA_URL || 'Not set',
      allTables: allTables
    });
    
  } catch (error) {
    console.error('Database check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: '❌ Database connection failed',
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        databaseUrl: process.env.POSTGRES_PRISMA_URL || 'Not set',
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 500 }
    );
  }
}
