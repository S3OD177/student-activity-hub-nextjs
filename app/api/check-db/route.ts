import { NextResponse } from 'next/server';

// Force dynamic route behavior
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Simple database check
    const response = await fetch(process.env.DATABASE_URL || '');
    
    if (!response.ok) {
      throw new Error('Could not connect to the database');
    }

    return NextResponse.json({
      status: 'success',
      message: '✅ Database connection successful!',
      timestamp: new Date().toISOString(),
      database: 'Supabase PostgreSQL',
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    console.error('Database check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: '❌ Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
