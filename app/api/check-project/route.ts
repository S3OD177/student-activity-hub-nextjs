import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set',
    postgresPrismaUrl: process.env.POSTGRES_PRISMA_URL,
    postgresUrlNonPooling: process.env.POSTGRES_URL_NON_POOLING,
    databaseUrl: process.env.DATABASE_URL,
  });
}
