import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-api"

export async function GET() {
  try {
    // Test basic Supabase connection
    console.log("Testing Supabase connection...")
    console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "SET" : "MISSING")
    console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "SET" : "MISSING")
    
    const { data, error } = await supabase
      .from('activities')
      .select('count')
      .limit(1)

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
        env: {
          SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "MISSING",
          SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "SET" : "MISSING"
        }
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection working",
      data: data,
      env: {
        SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "MISSING",
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "SET" : "MISSING"
      }
    })
  } catch (error: any) {
    console.error("Debug endpoint error:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
