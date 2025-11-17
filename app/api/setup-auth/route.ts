import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Use service role key to create users (bypasses email confirmation)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const demoUsers = [
      { email: 'admin@studenthub.com', password: 'admin123', role: 'admin' },
      { email: 'user@studenthub.com', password: 'user123', role: 'user' },
      { email: 'leader@studenthub.com', password: 'leader123', role: 'club_leader' }
    ];

    const results = [];

    for (const user of demoUsers) {
      // Create user in Supabase Auth
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          role: user.role
        }
      });

      if (error) {
        results.push({ email: user.email, success: false, error: error.message });
      } else {
        results.push({ email: user.email, success: true, id: data.user?.id });
      }
    }

    return NextResponse.json({
      success: true,
      message: '✅ Demo users created in Supabase Auth!',
      results,
      credentials: [
        { email: 'admin@studenthub.com', password: 'admin123' },
        { email: 'user@studenthub.com', password: 'user123' },
        { email: 'leader@studenthub.com', password: 'leader123' }
      ]
    });

  } catch (error) {
    console.error('❌ Setup error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
