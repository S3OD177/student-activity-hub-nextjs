import { NextResponse } from 'next/server';
import { db } from '@/lib/supabase-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 Testing Supabase client connection...');
    
    // Test 1: Direct Supabase client query
    console.log('🔍 Test 1: Direct Supabase query for admin user...');
    const { data: directData, error: directError } = await (await import('@/lib/supabase-client')).supabase
      .from('users')
      .select('id, email, username, role')
      .eq('email', 'admin@studenthub.com')
      .single();
    
    console.log('🔍 Direct query result:', { data: directData, error: directError });
    
    // Test 2: Compatibility layer query
    console.log('🔍 Test 2: Compatibility layer query for admin user...');
    const compatData = await db.users.findUnique({
      where: { email: 'admin@studenthub.com' }
    });
    
    console.log('🔍 Compatibility layer result:', compatData);
    
    // Test 3: List all users
    console.log('🔍 Test 3: List all users in database...');
    const { data: allUsers, error: allUsersError } = await (await import('@/lib/supabase-client')).supabase
      .from('users')
      .select('id, email, username, role')
      .limit(5);
    
    console.log('🔍 All users result:', { data: allUsers, error: allUsersError });
    
    return NextResponse.json({
      success: true,
      tests: {
        directQuery: {
          success: !!directData,
          data: directData,
          error: directError?.message
        },
        compatibilityLayer: {
          success: !!compatData,
          data: compatData ? {
            id: compatData.id,
            email: compatData.email,
            username: compatData.username,
            role: compatData.role
          } : null,
          error: compatData ? null : 'User not found via compatibility layer'
        },
        allUsers: {
          success: !!allUsers,
          count: allUsers?.length || 0,
          data: allUsers,
          error: allUsersError?.message
        }
      },
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
      }
    });
    
  } catch (error) {
    console.error('❌ Supabase test error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
