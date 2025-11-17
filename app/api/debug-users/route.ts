import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test 1: Check connection
    const { data: allUsers, error: allError } = await supabase
      .from('users')
      .select('id, email, username, role')
      .limit(5);

    // Test 2: Try to find admin user specifically
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@studenthub.com')
      .single();

    return NextResponse.json({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      test1_allUsers: {
        success: !allError,
        count: allUsers?.length || 0,
        users: allUsers,
        error: allError?.message
      },
      test2_adminUser: {
        success: !adminError,
        found: !!adminUser,
        user: adminUser ? {
          id: adminUser.id,
          email: adminUser.email,
          username: adminUser.username,
          role: adminUser.role
        } : null,
        error: adminError?.message
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
