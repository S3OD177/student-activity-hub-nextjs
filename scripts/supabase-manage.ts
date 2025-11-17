#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zxwhrrakccgtizuhjrnf.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4d2hycmFrY2NndGl6dWhqcm5mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM0Nzc2NiwiZXhwIjoyMDc4OTIzNzY2fQ.placeholder'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTables() {
  console.log('🔍 Checking database tables...')
  
  const { data: tables, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
  
  if (error) {
    console.error('❌ Error checking tables:', error)
    return
  }
  
  console.log('✅ Tables found:', tables?.map(t => t.table_name))
}

async function checkUsers() {
  console.log('👥 Checking users table...')
  
  const { data: users, error } = await supabase
    .from('users')
    .select('id, username, email, role, created_at')
    .limit(10)
  
  if (error) {
    console.error('❌ Error checking users:', error)
    return
  }
  
  console.log('✅ Users found:', users?.length)
  users?.forEach(user => {
    console.log(`  - ${user.username} (${user.email}) - ${user.role}`)
  })
}

async function main() {
  const command = process.argv[2]
  
  switch (command) {
    case 'tables':
      await checkTables()
      break
    case 'users':
      await checkUsers()
      break
    default:
      console.log('🚀 Supabase Management Script')
      console.log('')
      console.log('Usage:')
      console.log('  npm run supabase tables  - Check database tables')
      console.log('  npm run supabase users   - Check users table')
      break
  }
}

main().catch(console.error)
