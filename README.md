# Student Activity Hub - Next.js 14

A comprehensive web application for managing student extracurricular activities, built with modern technologies and best practices. This platform serves students, administrators, and club leaders with role-based access control and real-time activity management.

## 🌟 Features

### Core Functionality
- ✅ **User Authentication** - Secure login/register with email verification
- ✅ **Role-Based Access Control** - Admin, Student, and Club Leader roles
- ✅ **Activity Management** - Complete CRUD operations for activities
- ✅ **Enrollment System** - Real-time enrollment tracking with capacity limits
- ✅ **Club Management** - Create and manage student clubs with membership
- ✅ **Certificate Generation** - Automated certificates for completed activities
- ✅ **Analytics Dashboard** - Comprehensive statistics and insights

### User Experience
- ✅ **Responsive Design** - Mobile-first approach with desktop optimization
- ✅ **Dark Mode Support** - Theme switching with system preference detection
- ✅ **Multi-language Support** - Internationalization ready
- ✅ **Real-time Notifications** - Activity updates and announcements
- ✅ **Search & Filtering** - Advanced activity discovery with multiple filters
- ✅ **Personalized Dashboard** - Role-specific quick actions and statistics

### Administrative Features
- ✅ **Admin Dashboard** - Complete system management interface
- ✅ **User Management** - Role assignment and user oversight
- ✅ **Bulk Operations** - Mass certificate issuance and data export
- ✅ **Audit Trail** - Activity logging and system monitoring
- ✅ **Maintenance Mode** - System maintenance controls

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui components
- **Icons:** Lucide React
- **State Management:** React Context API
- **Forms:** Zod validation with React Hook Form

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** NextAuth.js with credential provider
- **API:** Next.js API Routes with RESTful design
- **Validation:** Zod schemas for type safety
- **File Storage:** Supabase Storage

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint with Next.js configuration
- **Type Checking:** TypeScript strict mode
- **Build Tool:** Next.js optimized builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Supabase account

### 1. Clone Repository
```bash
git clone https://github.com/S3OD177/student-activity-hub-nextjs.git
cd student-activity-hub-nextjs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# Database (Legacy - for reference)
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/database"
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the database migrations from `prisma/schema.prisma`
3. Set up authentication in Supabase dashboard
4. Configure Row Level Security (RLS) policies

### 5. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📁 Project Structure

```
student-activity-hub-nextjs/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages (login, register)
│   ├── admin/                    # Admin dashboard and management
│   ├── activities/               # Activity browsing and management
│   ├── api/                      # API routes
│   │   ├── activities/           # Activity CRUD operations
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── clubs/                # Club management
│   │   ├── enrollments/          # Enrollment operations
│   │   └── debug/                # Debug endpoints
│   ├── clubs/                    # Club pages
│   ├── dashboard/                # User dashboard
│   ├── certificates/             # Certificate management
│   ├── profile/                  # User profile management
│   ├── settings/                 # Application settings
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx                # Navigation component
│   ├── footer.tsx                # Footer component
│   └── ...                       # Other custom components
├── contexts/                     # React contexts
│   ├── theme-context.tsx         # Theme management
│   └── language-context.tsx      # Internationalization
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── supabase-api.ts           # Supabase client for API routes
│   └── ...                       # Other utilities
├── utils/                        # Utility functions
│   └── supabase/                 # Supabase client configurations
├── types/                        # TypeScript type definitions
├── prisma/                       # Database schema and migrations
├── public/                       # Static assets
└── README.md                     # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Database (Legacy)
npx prisma db push       # Push schema to database
npx prisma generate      # Generate Prisma client
npx prisma studio        # Open Prisma Studio
```

## 👥 User Roles & Permissions

### Students
- Browse and search activities
- Enroll in activities (subject to capacity)
- View personal dashboard and statistics
- Manage profile and preferences
- View certificates and history

### Club Leaders
- All student permissions
- Create and manage clubs
- Organize club activities
- Manage club memberships
- Communicate with club members

### Administrators
- All user permissions
- Complete activity management
- User role management
- System configuration
- Analytics and reporting
- Bulk certificate issuance
- Maintenance controls

## 🏗 Database Schema

### Core Tables
- **users** - User accounts and profiles
- **activities** - Activity definitions and details
- **enrollments** - Student activity enrollments
- **clubs** - Student club information
- **memberships** - Club membership relationships
- **announcements** - System announcements
- **certificates** - Generated certificates
- **notifications** - User notifications

### Key Relationships
- Users can enroll in multiple activities
- Activities can have multiple students enrolled
- Clubs have memberships with users
- Certificates are linked to completed enrollments

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   NEXTAUTH_SECRET=your-secret-key
   ```
4. Deploy automatically on push to main branch

### Environment Variables for Production
- `SUPABASE_URL` - Supabase project URL (server-side)
- `SUPABASE_ANON_KEY` - Supabase anonymous key (server-side)
- `NEXTAUTH_SECRET` - Secret for NextAuth session signing
- `NEXTAUTH_URL` - Production URL for NextAuth

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Authentication** - Secure password hashing with bcrypt
- **Session Management** - JWT-based sessions with NextAuth
- **Role-Based Access** - Server-side role verification
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Parameterized queries with Supabase
- **XSS Protection** - Built-in Next.js security headers
- **CSRF Protection** - NextAuth CSRF protection

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Activities
- `GET /api/activities` - List activities with filtering
- `POST /api/activities` - Create activity (admin only)
- `GET /api/activities/[id]` - Get activity details
- `PUT /api/activities/[id]` - Update activity (admin only)
- `DELETE /api/activities/[id]` - Delete activity (admin only)

### Enrollments
- `GET /api/enrollments` - Get user enrollments
- `POST /api/enrollments` - Enroll in activity
- `DELETE /api/enrollments/[id]` - Cancel enrollment

### Clubs
- `GET /api/clubs` - List clubs
- `POST /api/clubs` - Create club (admin only)
- `POST /api/clubs/[id]/join` - Join club

### Debug
- `GET /api/debug/env` - Check environment variables
- `GET /api/debug/supabase` - Test Supabase connection

## 🎨 UI Components

The application uses a comprehensive design system with:
- **Buttons** - Primary, secondary, ghost, and icon variants
- **Cards** - Activity cards, user cards, stats cards
- **Forms** - Controlled inputs with validation
- **Navigation** - Responsive navbar with mobile menu
- **Modals** - Dialog components for focused interactions
- **Notifications** - Toast notifications and alert banners

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints** - sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly** - 44px minimum touch targets
- **Adaptive Layouts** - Grid and flexbox responsive systems

## 🧪 Testing

### Manual Testing
- User registration and login flows
- Activity enrollment and management
- Admin dashboard functionality
- Responsive design across devices

### Debug Endpoints
- `/api/debug/env` - Environment variable status
- `/api/debug/supabase` - Database connection test
- `/api/health` - Application health check

## 🔄 Migration from PHP Version

This is a complete rebuild of the original PHP-based Student Activity Hub with:
- **Modern Architecture** - Next.js 14 with App Router
- **Type Safety** - Full TypeScript implementation
- **Better Performance** - Client-side routing and optimized builds
- **Enhanced Security** - Modern authentication and validation
- **Improved UX** - Responsive design and real-time updates
- **Scalability** - Cloud-native architecture with Supabase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the debug endpoints for environment/connection issues
2. Review the Vercel deployment logs for build errors
3. Ensure all environment variables are correctly configured
4. Verify Supabase project settings and RLS policies

## 📊 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with calendar systems
- [ ] Payment processing for paid activities
- [ ] Multi-tenant support for institutions
- [ ] Advanced notification system
- [ ] Real-time chat and collaboration
- [ ] API documentation with Swagger

---

**Built with ❤️ for educational institutions**
