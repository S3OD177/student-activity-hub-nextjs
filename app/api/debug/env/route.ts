import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    supabase_url: process.env.SUPABASE_URL ? "SET" : "MISSING",
    supabase_anon_key: process.env.SUPABASE_ANON_KEY ? "SET" : "MISSING",
    database_url: process.env.DATABASE_URL ? "SET" : "MISSING",
    node_env: process.env.NODE_ENV || "MISSING"
  })
}
