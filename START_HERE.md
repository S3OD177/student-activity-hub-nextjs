# 🚀 Quick Start Guide

## Current Status
✅ Application is running at **http://localhost:3000**  
⏳ Database needs to be set up

---

## 🔧 Setup Database (Choose One Method)

### Method 1: Using Existing MySQL (Recommended)

Since you have MySQL running for your PHP project, use the same server:

1. **Open phpMyAdmin or MySQL Workbench**

2. **Create the new database:**
   ```sql
   CREATE DATABASE student_activity_hub_nextjs;
   ```

3. **Run these commands in your project terminal:**
   ```bash
   cd C:\Users\m_ah1\Desktop\student-activity-hub-nextjs
   
   # Create database tables
   npx prisma db push
   
   # Add demo accounts and sample data
   npm run seed
   ```

### Method 2: Start MySQL Service

If MySQL is installed as a service:

```bash
# Try these commands (one should work):
net start MySQL
net start MySQL80
net start MySQL57
net start MariaDB

# Or check services:
services.msc
# Look for MySQL and start it
```

### Method 3: Using XAMPP/WAMP

1. Open XAMPP/WAMP Control Panel
2. Start MySQL/MariaDB
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create database: `student_activity_hub_nextjs`
5. Run the commands from Method 1 step 3

---

## 🎯 After Database Setup

Once the database is ready, you'll have instant access to:

### 👨‍💼 Admin Account
```
Email: admin@studenthub.com
Password: admin123
```

### 👤 Student Account
```
Email: user@studenthub.com
Password: user123
```

---

## 📱 Access the Application

**URL:** http://localhost:3000

### What You Can Do:

1. **Home Page** - View landing page
2. **Register** - Create new accounts
3. **Login** - Use demo accounts
4. **Dashboard** - View enrolled activities
5. **Activities** - Browse all activities
6. **Admin Panel** - Manage activities (admin only)

---

## 🎮 Demo Data Included

After running `npm run seed`:

- ✅ 2 demo users (admin + student)
- ✅ 10 sample activities
- ✅ 3 pre-enrolled activities
- ✅ User interests configured

---

## 🆘 Need Help?

### Can't connect to database?
- Make sure MySQL is running
- Check your `.env` file has correct credentials
- Default: `mysql://root:@localhost:3306/student_activity_hub_nextjs`

### Port 3000 already in use?
```bash
npx kill-port 3000
# or use different port
npm run dev -- -p 3001
```

### Want to reset everything?
```bash
# Drop and recreate database
npx prisma db push --force-reset

# Re-seed demo data
npm run seed
```

---

## ✨ You're Ready!

Once database is set up, just visit **http://localhost:3000** and login with demo accounts!
