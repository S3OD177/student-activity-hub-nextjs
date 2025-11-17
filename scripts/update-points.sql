-- Update user points for leaderboard
UPDATE users SET total_points = 450 WHERE email = 'user@studenthub.com';
UPDATE users SET total_points = 320 WHERE email = 'leader@studenthub.com';
UPDATE users SET total_points = 150 WHERE email = 'admin@studenthub.com';

-- If you have more users, add them here with random points between 100-600
