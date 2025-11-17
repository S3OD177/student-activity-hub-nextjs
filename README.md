# Student Activity Hub - Next.js

A modern web application for managing student activities, built with Next.js 14, TypeScript, Prisma, and TailwindCSS.

## Features

✅ User Authentication (Login/Register)
✅ Role-based Access Control (Admin/User)
✅ Activity Management (CRUD operations)
✅ Activity Enrollment System
✅ User Interests & Personalized Recommendations
✅ Email Verification & Password Reset
✅ Modern Responsive UI
✅ Search & Filter Activities
✅ Dashboard with Statistics
✅ Profile Management

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** MySQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** TailwindCSS + shadcn/ui
- **Icons:** Lucide React
- **Forms:** Zod validation

## Setup Instructions

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE student_activity_hub_nextjs;
```

### 2. Environment Variables

Update `.env` with your database credentials:
```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/student_activity_hub_nextjs"
NEXTAUTH_SECRET="your-random-secret-key"
```

### 3. Install Dependencies (Already Done)

```bash
npm install --legacy-peer-deps
```

### 4. Initialize Database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Default Admin Account

After running the app, register a new user and manually update the database to make them an admin:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── activities/        # Activities pages
│   ├── admin/             # Admin panel
│   └── layout.tsx         # Root layout
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── types/                 # TypeScript types

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Migration from PHP Version

This is a complete rebuild of the original PHP-based Student Activity Hub with:
- Modern architecture
- Better performance
- Enhanced security
- Improved UI/UX
- Type safety with TypeScript
- Better code organization

## License

MIT
