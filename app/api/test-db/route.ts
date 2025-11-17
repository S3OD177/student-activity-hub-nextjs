import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/lib/supabase'

export async function GET() {
  const result = await testDatabaseConnection()
  
  if (result.success) {
    return NextResponse.json({
      message: '✅ Database connected successfully!',
      data: result.data
    })
  } else {
    return NextResponse.json({
      message: '❌ Database connection failed',
      error: result.error
    }, { status: 500 })
  }
}
