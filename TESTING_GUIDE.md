# 🧪 Complete Testing Guide - Student Activity Hub

## 📋 Test Accounts

### Admin Account
- **Email:** `admin@studenthub.com`
- **Password:** `admin123`

### Student Account
- **Email:** `user@studenthub.com`
- **Password:** `user123`

### Club Leader Account
- **Email:** `leader@studenthub.com`
- **Password:** `leader123`

---

## ✅ Testing Checklist

### 🏠 Public Pages (No Login Required)

#### 1. Landing Page - `/`
- [ ] Auto-cycling gradient colors (changes every 4 seconds)
- [ ] "Get Started Free" button visible and working
- [ ] "Sign In" button visible with white text
- [ ] Features section displays 6 features
- [ ] Stats section shows numbers (500+, 100+, 50+, 95%)
- [ ] "How It Works" section with 3 steps
- [ ] CTA button at bottom
- [ ] Dark mode toggle works
- [ ] Theme color selector works
- [ ] Responsive on mobile

#### 2. Login Page - `/login`
- [ ] Form displays correctly
- [ ] Email and password fields work
- [ ] Login with admin account works
- [ ] Login with student account works
- [ ] Demo accounts section visible
- [ ] Theme icon background uses dynamic color
- [ ] Dark mode works
- [ ] Redirects to appropriate dashboard after login

#### 3. Register Page - `/register`
- [ ] Registration form displays
- [ ] Can create new account
- [ ] Validation works
- [ ] Redirects after successful registration

---

### 👨‍💼 Admin Pages (Login as admin@studenthub.com)

#### 4. Admin Dashboard - `/admin`
- [ ] Hero section with dynamic theme color
- [ ] Stats cards show correct numbers
- [ ] Activities tab displays all activities
- [ ] Can create new activity
- [ ] Can edit activity
- [ ] Can delete activity
- [ ] **Certificate button (🏆 Award icon) visible**
- [ ] Can issue certificates by clicking Award icon
- [ ] Users tab shows all users
- [ ] Announcements tab works
- [ ] Clubs tab displays clubs
- [ ] Can create new club
- [ ] Export buttons work
- [ ] Dark mode works

#### 5. Admin Analytics - `/analytics`
- [ ] Charts and graphs display
- [ ] Data visualization works
- [ ] Filters work

---

### 👤 Student Pages (Login as user@studenthub.com)

#### 6. Dashboard - `/dashboard`
- [ ] Hero section with dynamic theme color
- [ ] Welcome message shows user name
- [ ] Quick action cards display
- [ ] Enrolled activities section shows
- [ ] Upcoming activities display
- [ ] Past activities display
- [ ] Announcements section works
- [ ] Dark mode works

#### 7. Activities Page - `/activities`
- [ ] Hero section with dynamic theme color
- [ ] **Stats bar displays (Total, Enrolled, Favorites, Upcoming)**
- [ ] Search bar works
- [ ] **Filter button shows/hides advanced filters**
- [ ] **Category filter works**
- [ ] **Status filters work (All, Upcoming, Available Spots, My Enrollments)**
- [ ] **Active filter badges show with X to remove**
- [ ] Sort dropdown works (By Date, Most Popular, Newest)
- [ ] Activity cards display with images
- [ ] Enrollment count and progress bar show
- [ ] Favorite button (heart icon) works
- [ ] Enroll button works
- [ ] Unenroll button works for enrolled activities
- [ ] "Activity Full" shows when maxStudents reached
- [ ] Click on activity card opens detail page
- [ ] Dark mode works
- [ ] Responsive layout

#### 8. Activity Detail Page - `/activities/[id]`
- [ ] Activity details display
- [ ] Can enroll from detail page
- [ ] Related activities show
- [ ] Reviews section works

#### 9. Clubs Page - `/clubs`
- [ ] Hero section with dynamic theme color
- [ ] Search bar works
- [ ] Club cards display
- [ ] Can view club details
- [ ] Can join/leave clubs
- [ ] Dark mode works

#### 10. Club Detail Page - `/clubs/[id]`
- [ ] Club information displays
- [ ] Members list shows
- [ ] Activities list shows
- [ ] Join/Leave button works

#### 11. Calendar Page - `/calendar`
- [ ] Hero section with dynamic theme color
- [ ] Calendar grid displays
- [ ] Activities show on correct dates
- [ ] Can navigate months
- [ ] Can select date to see activities
- [ ] Export to Google Calendar works
- [ ] Download ICS file works
- [ ] Dark mode works

#### 12. Leaderboard Page - `/leaderboard`
- [ ] Hero section with dynamic theme color
- [ ] Top 3 podium displays with special styling
- [ ] User rankings show
- [ ] Points, activities, and badges display
- [ ] Dark mode works

#### 13. Portfolio Page - `/portfolio`
- [ ] Hero section with dynamic theme color
- [ ] **Gradient stat cards (Blue, Green, Purple)**
- [ ] Events Attended count shows
- [ ] Upcoming Events count shows
- [ ] Badges Earned count shows
- [ ] Activity Highlights list displays
- [ ] Download Report button works
- [ ] Empty state shows if no activities
- [ ] Dark mode works

#### 14. Certificates Page - `/certificates`
- [ ] Hero section with dynamic theme color
- [ ] Stats show (Total, Enrolled, Favorites, Upcoming)
- [ ] Certificate cards display for completed activities
- [ ] "View Certificate" button works
- [ ] Empty state shows if no certificates
- [ ] Dark mode works

#### 15. Certificate Detail Page - `/certificates/[id]`
- [ ] Certificate preview displays
- [ ] User name shows on certificate
- [ ] Activity title shows
- [ ] Completion date shows
- [ ] Download Certificate button works
- [ ] Print functionality works
- [ ] Back button works

#### 16. Notifications Page - `/notifications`
- [ ] Hero section with dynamic theme color
- [ ] Unread count displays
- [ ] Notifications list shows
- [ ] Mark as read button works
- [ ] Delete button works
- [ ] Mark all as read works
- [ ] Icons display based on type (activity, club, badge)
- [ ] Empty state shows if no notifications
- [ ] Dark mode works

#### 17. Profile Page - `/profile`
- [ ] User information displays
- [ ] Can edit profile
- [ ] Avatar upload works
- [ ] Settings can be changed

#### 18. Settings Page - `/settings`
- [ ] Theme selector card displays
- [ ] Can change color theme
- [ ] Email notifications toggle works
- [ ] Profile visibility settings work
- [ ] Dark mode toggle works

#### 19. My Activity Page - `/activity`
- [ ] Shows user's enrolled activities
- [ ] Can view activity details
- [ ] Can unenroll

---

### 🔔 Notification Dropdown (All Logged-in Users)

#### 20. Notification Dropdown - Navbar
- [ ] Bell icon shows in navbar
- [ ] Unread count badge displays
- [ ] Click opens dropdown (not page redirect)
- [ ] Shows 5 most recent notifications
- [ ] Mark as read button works
- [ ] Delete button works
- [ ] "View All Notifications" link works
- [ ] Closes when clicking outside
- [ ] Dark mode works

---

### 🎨 Theme System (All Pages)

#### 21. Color Theme Selector
- [ ] Palette icon visible in navbar
- [ ] Dropdown shows all color themes:
  - Default (Blue/Purple)
  - Green/Teal
  - Purple/Pink
  - Orange/Red
  - Cyan/Blue
- [ ] Selecting theme changes colors immediately
- [ ] Theme persists after page reload
- [ ] Theme applies to:
  - Hero sections
  - Buttons
  - Stat cards
  - All themed elements

#### 22. Dark Mode Toggle
- [ ] Moon/Sun icon in navbar
- [ ] Toggles between light and dark
- [ ] Persists after page reload
- [ ] All pages support dark mode
- [ ] Text remains readable in both modes
- [ ] Colors adjust appropriately

---

### 🔄 Navigation & Layout

#### 23. Navbar
- [ ] Logo links to home
- [ ] Desktop navigation shows correct links
- [ ] Mobile hamburger menu works
- [ ] Admin sees admin-specific links
- [ ] Students see student-specific links
- [ ] Theme selector works
- [ ] Dark mode toggle works
- [ ] Notification dropdown works (students)
- [ ] User menu/logout works
- [ ] Responsive on all screen sizes

#### 24. Footer
- [ ] Displays on all pages
- [ ] Links work
- [ ] Social media icons present
- [ ] Copyright text shows
- [ ] Dark mode styling works

---

### 🎯 Key Features to Test

#### 25. Certificate System
- [ ] Admin can click Award icon (🏆) on activities
- [ ] Confirmation dialog appears
- [ ] Certificates issued to attended students
- [ ] Students receive notification
- [ ] Students can view certificates at `/certificates`
- [ ] Students can download/print certificates
- [ ] Certificate shows correct user name and activity

#### 26. Enrollment System
- [ ] Students can enroll in activities
- [ ] Enrollment count updates
- [ ] Progress bar shows correctly
- [ ] "Activity Full" displays when limit reached
- [ ] Students can unenroll
- [ ] Enrolled activities show in dashboard

#### 27. Favorites System
- [ ] Heart icon toggles favorite status
- [ ] Favorites count updates in stats
- [ ] Favorited activities highlighted

#### 28. Search & Filters
- [ ] Search works across activities
- [ ] Category filters work
- [ ] Status filters work
- [ ] Sort options work
- [ ] Filter badges show active filters
- [ ] Can remove filters with X button

---

## 🐛 Common Issues to Check

- [ ] No console errors in browser
- [ ] All images load (or show placeholder)
- [ ] No broken links
- [ ] Forms validate properly
- [ ] Loading states show appropriately
- [ ] Error messages display when needed
- [ ] Success messages show after actions
- [ ] Redirects work correctly
- [ ] Session persists across pages
- [ ] Logout works and clears session

---

## 📱 Responsive Testing

Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🎨 Visual Testing

- [ ] Consistent spacing and alignment
- [ ] Colors match theme
- [ ] Typography is readable
- [ ] Icons display correctly
- [ ] Buttons have hover effects
- [ ] Cards have shadow effects
- [ ] Animations are smooth
- [ ] No layout shifts

---

## ⚡ Performance Testing

- [ ] Pages load quickly
- [ ] No excessive API calls
- [ ] Images optimized
- [ ] Smooth scrolling
- [ ] No lag when switching themes

---

## 🔒 Security Testing

- [ ] Unauthenticated users redirected to login
- [ ] Admin pages blocked for non-admins
- [ ] API endpoints validate authentication
- [ ] No sensitive data in console
- [ ] Passwords not visible in forms

---

## ✅ Final Checklist

- [ ] All public pages work
- [ ] All admin pages work
- [ ] All student pages work
- [ ] Theme system works everywhere
- [ ] Dark mode works everywhere
- [ ] Notification system works
- [ ] Certificate system works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Ready for production

---

## 🎉 Testing Complete!

If all items are checked, the application is fully functional and ready to use!

**Server:** http://localhost:3000
**Admin:** admin@studenthub.com / admin123
**Student:** user@studenthub.com / user123
