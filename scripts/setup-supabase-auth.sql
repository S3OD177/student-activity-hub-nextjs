-- This SQL creates demo users in Supabase Auth
-- Run this in Supabase SQL Editor

-- Note: Supabase Auth handles password hashing automatically
-- You'll need to create users via the Supabase Dashboard > Authentication > Users
-- OR use the Supabase API

-- For now, let's just verify the auth.users table exists
SELECT * FROM auth.users LIMIT 5;

-- To create users, go to Supabase Dashboard:
-- 1. Click "Authentication" in sidebar
-- 2. Click "Add user" button
-- 3. Create these demo accounts:
--    - admin@studenthub.com / admin123
--    - user@studenthub.com / user123  
--    - leader@studenthub.com / leader123
