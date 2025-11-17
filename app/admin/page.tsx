"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Users, BookOpen, Plus, Edit, Trash2, X, Download, Megaphone, Award, Search, Filter, Eye, UserCheck, BarChart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { themeConfig } = useTheme()
  const { t } = useLanguage()
  const [activities, setActivities] = useState<any[]>([])
  const [stats, setStats] = useState({ totalActivities: 0, totalEnrollments: 0, totalUsers: 0 })
  const [users, setUsers] = useState<any[]>([])
  const [showUsersModal, setShowUsersModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"activities" | "users" | "announcements" | "clubs">("activities")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [showClubModal, setShowClubModal] = useState(false)
  const [clubFormData, setClubFormData] = useState({
    name: "",
    description: "",
    department: ""
  })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingActivity, setEditingActivity] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxStudents: 0,
    academicLevel: "",
    major: "",
    instructor: "",
    category: "General",
  })
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    priority: "normal"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user.role === "admin") {
      fetchActivities()
      fetchStats()
      fetchUsers()
      fetchAnnouncements()
      fetchClubs()
    }
  }, [session])

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities")
      const data = await response.json()
      setActivities(data)
    } catch (error) {
      console.error("Error fetching activities:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const [activitiesRes, usersRes] = await Promise.all([
        fetch("/api/activities"),
        fetch("/api/users"),
      ])
      const activitiesData = await activitiesRes.json()
      const usersData = await usersRes.json()
      
      const totalEnrollments = activitiesData.reduce(
        (sum: number, activity: any) => sum + activity._count.enrollments,
        0
      )

      setStats({
        totalActivities: activitiesData.length,
        totalEnrollments,
        totalUsers: usersData.length || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements")
      const data = await response.json()
      setAnnouncements(data)
    } catch (error) {
      console.error("Error fetching announcements:", error)
    }
  }

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/clubs")
      const data = await response.json()
      setClubs(data)
    } catch (error) {
      console.error("Error fetching clubs:", error)
    }
  }

  const handleCreateClub = async () => {
    try {
      const response = await fetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clubFormData)
      })
      if (response.ok) {
        toast({ title: "Club created successfully!" })
        setShowClubModal(false)
        setClubFormData({ name: "", description: "", department: "" })
        fetchClubs()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create club", variant: "destructive" })
    }
  }

  const handleDeleteClub = async (id: number) => {
    if (!confirm("Are you sure you want to delete this club?")) return
    try {
      const response = await fetch(`/api/clubs/${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Club deleted successfully!" })
        fetchClubs()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete club", variant: "destructive" })
    }
  }

  const handleChangeUserRole = async (userId: number, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      })
      if (response.ok) {
        toast({ title: "User role updated!" })
        fetchUsers()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update role", variant: "destructive" })
    }
  }

  const createAnnouncement = async () => {
    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcementForm)
      })
      if (response.ok) {
        toast({ title: "Announcement created!" })
        setAnnouncementForm({ title: "", content: "", priority: "normal" })
        fetchAnnouncements()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create announcement", variant: "destructive" })
    }
  }

  const deleteAnnouncement = async (id: number) => {
    try {
      await fetch(`/api/announcements?id=${id}`, { method: "DELETE" })
      toast({ title: "Announcement deleted" })
      fetchAnnouncements()
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete announcement", variant: "destructive" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingActivity
        ? `/api/activities/${editingActivity.id}`
        : "/api/activities"
      
      const method = editingActivity ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: editingActivity ? "Activity updated!" : "Activity created!",
        })
        setShowModal(false)
        setEditingActivity(null)
        resetForm()
        fetchActivities()
        fetchStats()
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save activity",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (activity: any) => {
    setEditingActivity(activity)
    setFormData({
      title: activity.title,
      description: activity.description,
      date: new Date(activity.date).toISOString().split('T')[0],
      location: activity.location,
      maxStudents: activity.maxStudents,
      academicLevel: activity.academicLevel || "",
      major: activity.major || "",
      instructor: activity.instructor || "",
      category: activity.category || "General",
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this activity?")) return

    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Activity deleted!",
        })
        fetchActivities()
        fetchStats()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      })
    }
  }

  const handleIssueCertificates = async (activityId: number) => {
    const activity = activities.find(a => a.id === activityId)
    if (!activity) return

    const activityDate = new Date(activity.date)
    const now = new Date()
    
    if (activityDate > now) {
      toast({
        title: "Error",
        description: "Cannot issue certificates for future activities",
        variant: "destructive",
      })
      return
    }

    if (!confirm(`Issue certificates to all students who attended "${activity.title}"?`)) return

    try {
      const response = await fetch("/api/admin/certificates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Issued ${data.count} certificate(s)`,
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to issue certificates",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue certificates",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      maxStudents: 0,
      academicLevel: "",
      major: "",
      instructor: "",
      category: "General",
    })
  }

  const openCreateModal = () => {
    setEditingActivity(null)
    resetForm()
    setShowModal(true)
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white">{t('admin.title')}</h1>
          <p className="text-white/90 mt-1">{t('dashboard.stats')}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Navigation Tabs & Actions Bar */}
        <div className="mb-8 space-y-4">
          {/* Tabs */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeTab === "activities" ? "default" : "outline"}
                onClick={() => setActiveTab("activities")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {t('nav.activities')}
              </Button>
              <Button
                variant={activeTab === "users" ? "default" : "outline"}
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-4 w-4 mr-2" />
                {t('admin.users')}
              </Button>
              <Button
                variant={activeTab === "announcements" ? "default" : "outline"}
                onClick={() => setActiveTab("announcements")}
              >
                <Megaphone className="h-4 w-4 mr-2" />
                {t('admin.announcements')}
              </Button>
              <Button
                variant={activeTab === "clubs" ? "default" : "outline"}
                onClick={() => setActiveTab("clubs")}
              >
                <Users className="h-4 w-4 mr-2" />
                {t('admin.clubs')}
              </Button>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              <Link href="/calendar">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('nav.calendar')}
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  {t('nav.analytics')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {activeTab === "clubs" && (
              <Button onClick={() => setShowClubModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t('common.create')} {t('admin.clubs')}
              </Button>
            )}
            
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open('/api/export?type=activities', '_blank')}>
                <Download className="h-4 w-4 mr-2" />
                {t('common.export')}
              </Button>
            </div>

            {selectedItems.length > 0 && (
              <Button variant="destructive" onClick={() => {
                setSelectedItems([])
                toast({ title: `${selectedItems.length} items selected` })
              }}>
                Bulk Actions ({selectedItems.length})
              </Button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("activities")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('nav.activities')}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalActivities}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("clubs")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.clubs')}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{clubs.length}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.totalEnrollments')}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalEnrollments}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("users")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.totalUsers')}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </CardContent>
          </Card>
        </div>
        {activeTab === "activities" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">All Activities</CardTitle>
                  <CardDescription>Manage and monitor your activities</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={openCreateModal} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Activity
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2 border rounded-md bg-background"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                  
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border rounded-md bg-background"
                  >
                    <option value="all">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Arts">Arts</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                    <option value="General">General</option>
                  </select>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {activities.filter(a => new Date(a.date) > new Date()).length}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Upcoming</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {activities.filter(a => new Date(a.date) <= new Date()).length}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {activities.reduce((sum, a) => sum + (a._count?.enrollments || 0), 0)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Enrollments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {activities.reduce((sum, a) => sum + a.maxStudents, 0)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Capacity</p>
                  </div>
                </div>
              </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-3 sm:px-6 py-4 text-left">
                      <input 
                        type="checkbox" 
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(activities.map(a => a.id))
                          } else {
                            setSelectedItems([])
                          }
                        }}
                        checked={selectedItems.length === activities.length && activities.length > 0}
                      />
                    </th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Location</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Enrollments</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {activities
                    .filter(activity => {
                      // Search filter
                      const matchesSearch = searchQuery === "" || 
                        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        activity.location.toLowerCase().includes(searchQuery.toLowerCase())
                      
                      // Status filter
                      const now = new Date()
                      const activityDate = new Date(activity.date)
                      const matchesStatus = statusFilter === "all" ||
                        (statusFilter === "upcoming" && activityDate > now) ||
                        (statusFilter === "past" && activityDate <= now)
                      
                      // Category filter
                      const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter
                      
                      return matchesSearch && matchesStatus && matchesCategory
                    })
                    .map((activity) => {
                      const isPast = new Date(activity.date) < new Date()
                      const enrollmentRate = activity.maxStudents > 0 
                        ? ((activity._count?.enrollments || 0) / activity.maxStudents * 100).toFixed(0)
                        : 0
                      
                      return (
                    <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-3 sm:px-6 py-4">
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(activity.id)} 
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, activity.id])
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== activity.id))
                            }
                          }}
                        />
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {activity.category && (
                                <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                  {activity.category}
                                </span>
                              )}
                              {isPast ? (
                                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                  Ended
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden mt-1">
                              {new Date(activity.date).toLocaleDateString()} • {activity.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        {new Date(activity.date).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                        {activity.location}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col gap-1">
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">{activity._count?.enrollments || 0}</span>
                            <span className="text-gray-400">/{activity.maxStudents}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                Number(enrollmentRate) >= 80 ? 'bg-green-600' :
                                Number(enrollmentRate) >= 50 ? 'bg-yellow-600' :
                                'bg-blue-600'
                              }`}
                              style={{ width: `${enrollmentRate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{enrollmentRate}% filled</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(activity)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleIssueCertificates(activity.id)} title="Issue Certificates" className="text-green-600 hover:text-green-700">
                            <Award className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(activity.id)} className="text-red-600 hover:text-red-700" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                      )}
                    )}
                </tbody>
              </table>
              
              {/* Empty State */}
              {activities
                .filter(activity => {
                  const matchesSearch = searchQuery === "" || 
                    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    activity.location.toLowerCase().includes(searchQuery.toLowerCase())
                  
                  const now = new Date()
                  const activityDate = new Date(activity.date)
                  const matchesStatus = statusFilter === "all" ||
                    (statusFilter === "upcoming" && activityDate > now) ||
                    (statusFilter === "past" && activityDate <= now)
                  
                  const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter
                  
                  return matchesSearch && matchesStatus && matchesCategory
                }).length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">No activities found</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    {searchQuery || statusFilter !== "all" || categoryFilter !== "all" 
                      ? "Try adjusting your filters"
                      : "Create your first activity to get started"
                    }
                  </p>
                  {!searchQuery && statusFilter === "all" && categoryFilter === "all" && (
                    <Button onClick={openCreateModal}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Activity
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Username</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Enrollments</th>
                      <th className="text-left p-4 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{user.username}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">{user._count.enrollments}</td>
                        <td className="p-4">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Announcement</CardTitle>
                <CardDescription>Post important updates to all users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ann-title">Title</Label>
                    <Input
                      id="ann-title"
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      placeholder="Announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ann-content">Content</Label>
                    <textarea
                      id="ann-content"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      placeholder="Announcement content"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ann-priority">Priority</Label>
                    <select
                      id="ann-priority"
                      value={announcementForm.priority}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <Button onClick={createAnnouncement}>
                    <Megaphone className="h-4 w-4 mr-2" />
                    Post Announcement
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 py-8">No announcements yet</p>
                  ) : (
                    announcements.map((ann) => (
                      <div key={ann.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{ann.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${
                              ann.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                              ann.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {ann.priority}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteAnnouncement(ann.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ann.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(ann.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {/* Clubs Tab */}
        {activeTab === "clubs" && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Clubs</CardTitle>
                  <CardDescription>Manage student clubs</CardDescription>
                </div>
                <Button onClick={() => setShowClubModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Club
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubs.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center py-8">No clubs yet</p>
                ) : (
                  clubs.map((club: any) => (
                    <Card key={club.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{club.name}</CardTitle>
                        <CardDescription>{club.department}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{club.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span>{club._count?.memberships || 0} members</span>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClub(club.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />

      {/* Club Modal */}
      {showClubModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create New Club</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowClubModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="club-name">Club Name *</Label>
                  <Input
                    id="club-name"
                    value={clubFormData.name}
                    onChange={(e) => setClubFormData({ ...clubFormData, name: e.target.value })}
                    placeholder="e.g., Computer Science Club"
                  />
                </div>
                <div>
                  <Label htmlFor="club-description">Description *</Label>
                  <textarea
                    id="club-description"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clubFormData.description}
                    onChange={(e) => setClubFormData({ ...clubFormData, description: e.target.value })}
                    placeholder="Describe the club..."
                  />
                </div>
                <div>
                  <Label htmlFor="club-department">Department</Label>
                  <Input
                    id="club-department"
                    value={clubFormData.department}
                    onChange={(e) => setClubFormData({ ...clubFormData, department: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateClub} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Club
                  </Button>
                  <Button variant="outline" onClick={() => setShowClubModal(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingActivity ? "Edit Activity" : "Create New Activity"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowModal(false)
                    setEditingActivity(null)
                    resetForm()
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxStudents">Max Students (0 = unlimited)</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      min="0"
                      value={formData.maxStudents}
                      onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="academicLevel">Academic Level</Label>
                    <Input
                      id="academicLevel"
                      placeholder="e.g., Level 3"
                      value={formData.academicLevel}
                      onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="major">Major</Label>
                    <Input
                      id="major"
                      placeholder="e.g., Computer Science"
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowModal(false)
                      setEditingActivity(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingActivity ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
