import { NextResponse } from 'next/server';

// Force dynamic route behavior
export const dynamic = 'force-dynamic';

export async function GET() {
  const envStatus = {
    // Database
    POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
    DATABASE_URL: !!process.env.DATABASE_URL,
    
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
    
    // NextAuth
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    
    // Environment
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    envStatus,
    missing: Object.entries(envStatus)
      .filter(([key, value]) => !value && key !== 'NODE_ENV' && key !== 'VERCEL_ENV')
      .map(([key]) => key),
  });
}