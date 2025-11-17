"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Award, Calendar, TrendingUp, User, Edit2, Save, X, Linkedin, Github, Twitter, Mail, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useTheme } from "@/contexts/theme-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function PortfolioPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { themeConfig } = useTheme()
  const { toast } = useToast()
  const [stats, setStats] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"portfolio" | "profile">("portfolio")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    bio: "",
    linkedIn: "",
    github: "",
    twitter: "",
    skills: "",
    gpa: "",
    graduationYear: "",
    studentId: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
    else if (session) {
      fetchStats()
      fetchProfile()
    }
  }, [status, session, router])

  const fetchStats = async () => {
    try {
      const enrollmentsRes = await fetch("/api/enrollments")
      
      if (!enrollmentsRes.ok) {
        throw new Error("Failed to fetch enrollments")
      }
      
      const enrollments = await enrollmentsRes.json()
      
      setStats({ 
        enrollments: Array.isArray(enrollments) ? enrollments : [],
        badges: [] // Badges feature not implemented yet
      })
      setError(null)
    } catch (error) {
      console.error("Error fetching portfolio data:", error)
      setError("Failed to load portfolio data. Please try refreshing the page.")
      setStats({ enrollments: [], badges: [] })
    } finally {
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          bio: data.bio || "",
          linkedIn: data.linkedIn || "",
          github: data.github || "",
          twitter: data.twitter || "",
          skills: data.skills || "",
          gpa: data.gpa || "",
          graduationYear: data.graduationYear || "",
          studentId: data.studentId || "",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        toast({ title: "Profile updated successfully!" })
        setEditing(false)
        fetchProfile()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" })
    }
  }

  const downloadReport = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  const eventsAttended = stats?.enrollments?.filter((e: any) => e.activity && new Date(e.activity.date) < new Date()).length || 0
  const upcomingEvents = stats?.enrollments?.filter((e: any) => e.activity && new Date(e.activity.date) >= new Date()).length || 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white">My Profile & Portfolio</h1>
              <p className="text-white/90 text-lg">Manage your profile and track your achievements</p>
            </div>
            <Button onClick={downloadReport} variant="secondary" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "portfolio" ? "default" : "outline"}
            onClick={() => setActiveTab("portfolio")}
            className="flex-1 max-w-xs"
          >
            Portfolio
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            onClick={() => setActiveTab("profile")}
            className="flex-1 max-w-xs"
          >
            Profile Settings
          </Button>
        </div>

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardContent className="py-4">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Events Attended</CardTitle>
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{eventsAttended}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Completed activities</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Upcoming Events</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{upcomingEvents}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Enrolled activities</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Badges Earned</CardTitle>
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Activity Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.enrollments && stats.enrollments.length > 0 ? (
              <div className="space-y-4">
                {stats.enrollments.slice(0, 5).map((e: any) => (
                  e.activity && (
                    <div key={e.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{e.activity.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(e.activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        {e.activity.category || 'General'}
                      </span>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">No activities yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Start enrolling in activities to build your portfolio</p>
              </div>
            )}
          </CardContent>
        </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex justify-end mb-4">
              {!editing ? (
                <Button onClick={() => setEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column - Profile Forms */}
              <div className="md:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={profile?.email || session?.user?.email || ""}
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!editing}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="gpa">GPA</Label>
                        <Input
                          id="gpa"
                          type="number"
                          step="0.01"
                          value={formData.gpa}
                          onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gradYear">Graduation Year</Label>
                        <Input
                          id="gradYear"
                          type="number"
                          value={formData.graduationYear}
                          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                          id="skills"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          disabled={!editing}
                          placeholder="React, Python..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                        <Input
                          placeholder="LinkedIn profile URL"
                          value={formData.linkedIn}
                          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        <Input
                          placeholder="GitHub username"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <Input
                          placeholder="Twitter handle"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Profile Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
                      <span className="text-2xl font-bold text-purple-600">{profile?.totalPoints || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Activities</span>
                      <span className="text-xl font-semibold">{stats?.enrollments?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Certificates</span>
                      <span className="text-xl font-semibold">
                        {stats?.enrollments?.filter((e: any) => e.certificateIssued).length || 0}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Display */}
                {formData.skills && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.split(',').map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
