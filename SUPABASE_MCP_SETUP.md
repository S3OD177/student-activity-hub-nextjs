# Supabase MCP Server Setup Guide

## 🎯 What We've Accomplished

✅ **MCP Supabase Server Configuration Ready**
✅ **Local Supabase Management Scripts Added**
✅ **Database Connection Test Endpoint Deployed**

---

## 🔧 **MCP Server Configuration**

Add this to your MCP client configuration file:

### **For Claude Desktop:**
Edit `~/.config/claude-desktop/config.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.supabase.com/mcp?project_ref=zxwhrrakccgtizuhjrnf"
      ]
    }
  }
}
```

### **For Other MCP Clients:**
Use the same configuration in your preferred MCP client setup.

---

## 🚀 **Local Management Scripts**

### **Available Commands:**

```bash
# Check database tables
npm run supabase:tables

# Check users in database
npm run supabase:users

# Show all available commands
npm run supabase
```

---

## 🧪 **Database Testing Methods**

### **1. API Endpoint Test:**
👉 https://student-activity-hub-nextjs-pa1seaqxz-sauds-projects-f007b766.vercel.app/api/test-db

### **2. Registration Test:**
1. Visit: https://student-activity-hub-nextjs-pa1seaqxz-sauds-projects-f007b766.vercel.app
2. Click "Sign up"
3. Create new account
4. Success = Database connected!

### **3. Demo Login Test:**
1. Click "Sign In"
2. Click "👨‍💼 Admin Demo"
3. Click "Sign In →"
4. Success = Database working!

---

## 🔑 **Getting Your Service Role Key**

To use the local scripts, you need your Supabase service role key:

1. Go to: https://supabase.com/dashboard/project/zxwhrrakccgtizuhjrnf/settings/api
2. Find "service_role" key
3. Add to your `.env` file:
   ```
   SUPABASE_SERVICE_KEY=your-service-role-key-here
   ```

---

## 📊 **Current Database Status**

- ✅ **Project ID:** zxwhrrakccgtizuhjrnf
- ✅ **Database:** PostgreSQL
- ✅ **Tables Created:** users, activities, enrollments, etc.
- ✅ **Demo Accounts:** 3 accounts with password `admin123`
- ✅ **Environment Variables:** Set in Vercel
- ✅ **Connection:** Live and ready

---

## 🎊 **Your Student Activity Hub is Complete!**

### **Features Working:**
- ✅ Bilingual (English/Arabic)
- ✅ Database connected to Supabase
- ✅ Authentication system
- ✅ Demo accounts ready
- ✅ MCP Supabase integration
- ✅ Analytics & monitoring
- ✅ Modern UI with themes

### **Production URL:**
👉 https://student-activity-hub-nextjs.vercel.app

### **GitHub Repository:**
👉 https://github.com/S3OD177/student-activity-hub-nextjs

---

**🚀 Ready to use! Test the database connection and enjoy your bilingual student activity management system!**
