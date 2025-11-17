# 🎯 Demo Account Setup Guide

## Quick Start - Demo Accounts

Once you set up the database, you'll have instant access to these demo accounts:

### 👨‍💼 Admin Account
```
Email: admin@studenthub.com
Password: admin123
```
**Permissions:** Full access to create, edit, delete activities and manage users

### 👤 Student Account
```
Email: user@studenthub.com
Password: user123
```
**Permissions:** Browse activities, enroll/unenroll, view dashboard

---

## 🚀 Setup Instructions

### Step 1: Start MySQL Server

**Windows:**
```bash
# Open Command Prompt as Administrator
net start MySQL80
# or
net start MySQL
```

**Alternative:** Start MySQL from XAMPP/WAMP control panel

### Step 2: Create Database

Open MySQL command line or phpMyAdmin and run:
```sql
CREATE DATABASE student_activity_hub_nextjs;
```

### Step 3: Push Database Schema

```bash
cd C:\Users\m_ah1\Desktop\student-activity-hub-nextjs
npx prisma db push
```

### Step 4: Seed Demo Data

```bash
npm run seed
```

This will create:
- ✅ 2 demo accounts (admin + user)
- ✅ 10 sample activities
- ✅ 3 sample enrollments
- ✅ User interests

### Step 5: Access the Application

The dev server is already running at:
**http://localhost:3000**

---

## 📊 What's Included in Demo Data

### Activities (10 total):
1. **Introduction to AI Workshop** - Level 3, Computer Science
2. **Web Development Bootcamp** - Level 2, Information Systems
3. **Cybersecurity Fundamentals** - Level 4, Computer Engineering
4. **Mobile App Development** - Level 3, Computer Science
5. **Data Science with Python** - Level 3, Computer Science
6. **Cloud Computing Workshop** - Level 4, Information Systems
7. **UI/UX Design Masterclass** - Level 2, Computer Science
8. **Blockchain Technology** - Level 4, Computer Engineering
9. **Game Development with Unity** - Level 3, Computer Science (Past event)
10. **DevOps and CI/CD** - Level 4, Information Systems (Past event)

### Pre-enrolled Activities (for user@studenthub.com):
- Introduction to AI Workshop
- Web Development Bootcamp
- Data Science with Python

---

## 🎮 Testing the Application

### As Admin (admin@studenthub.com):
1. Login with admin credentials
2. Navigate to Admin panel
3. Create new activities
4. Edit existing activities
5. Delete activities
6. View all enrolled students

### As Student (user@studenthub.com):
1. Login with user credentials
2. Browse available activities
3. Enroll in activities
4. View your dashboard
5. See your enrolled activities
6. Unenroll from activities

---

## 🔧 Troubleshooting

### Database Connection Error
```
Error: P1001: Can't reach database server
```
**Solution:** Make sure MySQL is running
```bash
net start MySQL80
```

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution:** Kill the process or use different port
```bash
npx kill-port 3000
# or
npm run dev -- -p 3001
```

### Prisma Client Not Generated
```
Error: Cannot find module '@prisma/client'
```
**Solution:** Generate Prisma client
```bash
npx prisma generate
```

---

## 📝 Manual Database Setup (Alternative)

If you prefer to set up manually without seed:

1. **Create Admin User:**
```sql
INSERT INTO users (username, email, password, role, is_verified) 
VALUES ('admin', 'admin@test.com', '$2y$10$...', 'admin', 1);
```

2. **Create Regular User:**
```sql
INSERT INTO users (username, email, password, role, is_verified) 
VALUES ('student', 'user@test.com', '$2y$10$...', 'user', 1);
```

Note: Use bcrypt to hash passwords properly.

---

## 🎉 You're All Set!

Your Student Activity Hub is ready with demo accounts and sample data.

**Next Steps:**
- Explore the application
- Test all features
- Customize activities
- Add your own data

**Need Help?** Check the main README.md for more information.
