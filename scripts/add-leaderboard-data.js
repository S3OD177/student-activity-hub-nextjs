const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('🎯 Adding leaderboard data...');

db.serialize(() => {
  // Update existing users with points
  db.run("UPDATE users SET total_points = 450 WHERE email = 'user@studenthub.com'", (err) => {
    if (err) console.error(err);
    else console.log('✅ Updated student user points');
  });

  db.run("UPDATE users SET total_points = 320 WHERE email = 'leader@studenthub.com'", (err) => {
    if (err) console.error(err);
    else console.log('✅ Updated club leader points');
  });

  db.run("UPDATE users SET total_points = 150 WHERE email = 'admin@studenthub.com'", (err) => {
    if (err) console.error(err);
    else console.log('✅ Updated admin points');
  });

  // Get all users and update with random points
  db.all("SELECT id FROM users WHERE role = 'user'", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    
    rows.forEach((row) => {
      const points = Math.floor(Math.random() * 400) + 100;
      db.run("UPDATE users SET total_points = ? WHERE id = ?", [points, row.id]);
    });
    
    console.log(`✅ Updated ${rows.length} users with random points`);
  });
});

db.close(() => {
  console.log('✅ Leaderboard data added successfully!');
});
