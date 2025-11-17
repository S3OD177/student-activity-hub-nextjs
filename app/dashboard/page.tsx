"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, BookOpen, LogOut } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { themeConfig } = useTheme()
  const { t } = useLanguage()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role === "admin") {
      router.push("/admin")
    }
  }, [status, session, router])

  useEffect(() => {
    if (session) {
      fetchEnrollments()
      fetchAnnouncements()
    }
  }, [session])

  const fetchEnrollments = async () => {
    try {
      console.log("Fetching enrollments...")
      const response = await fetch("/api/enrollments")
      console.log("Enrollments response status:", response.status)
      const data = await response.json()
      console.log("Enrollments data:", data)
      if (Array.isArray(data)) {
        setEnrollments(data)
      } else {
        console.error("Invalid enrollments data:", data)
        setEnrollments([])
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error)
      setEnrollments([])
    } finally {
      setLoading(false)
    }
  }

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements")
      const data = await response.json()
      if (Array.isArray(data)) {
        setAnnouncements(data.slice(0, 3)) // Get latest 3
      }
    } catch (error) {
      console.error("Error fetching announcements:", error)
    }
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

  if (!session) {
    return null
  }

  const upcomingEnrollments = enrollments.filter(
    (e) => e.activity && new Date(e.activity.date) >= new Date()
  )
  const pastEnrollments = enrollments.filter(
    (e) => e.activity && new Date(e.activity.date) < new Date()
  )
  
  console.log("Upcoming enrollments:", upcomingEnrollments)
  console.log("Past enrollments:", pastEnrollments)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${themeConfig.primary} text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">{t('dashboard.welcome')}, {session.user.name}! 👋</h1>
                <p className="text-white/90 text-lg">{t('dashboard.recentActivities')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Quick Actions for Students */}
        {session?.user.role === "user" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Link href="/clubs">
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold text-sm">{t('clubs.joinClub')}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/portfolio">
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold text-sm">{t('nav.portfolio')}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/leaderboard">
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold text-sm">{t('dashboard.leaderboard')}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Quick Actions for Club Leaders */}
        {session?.user.role === "club_leader" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎯 Club Leader Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/clubs">
                <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold text-sm">My Clubs</p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Create Event</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Announce</p>
                </CardContent>
              </Card>
              <Link href="/admin/analytics">
                <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Analytics</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Link href="/activities">
            <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Enrollments</CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{enrollments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Upcoming</CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{upcomingEnrollments.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Next activities</p>
            </CardContent>
          </Card>

          <Link href="/history">
            <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Completed</CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{pastEnrollments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Past activities</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">📢 Announcements</h2>
            <div className="space-y-3">
              {announcements.map((ann: any) => (
                <Card key={ann.id} className={`border-l-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 ${
                  ann.priority === 'urgent' ? 'border-l-red-500' :
                  ann.priority === 'high' ? 'border-l-orange-500' :
                  'border-l-blue-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{ann.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ann.content}</p>
                      </div>
                      <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded ${
                        ann.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        ann.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {ann.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{new Date(ann.createdAt).toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Activities */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Upcoming Activities</span>
          </h2>
          {upcomingEnrollments.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
              <CardContent className="py-12 text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">You haven't enrolled in any upcoming activities yet.</p>
                <Link href="/activities">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Browse Activities →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {upcomingEnrollments.map((enrollment) => (
                <Link key={enrollment.id} href="/activities">
                  <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 hover:scale-[1.02] cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-2xl">{t('dashboard.upcomingActivities')}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(enrollment.activity.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{enrollment.activity.description}</p>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{enrollment.activity.location}</span>
                      </div>
                      {enrollment.activity.instructor && (
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          Instructor: {enrollment.activity.instructor}
                        </p>
                      )}
                      <Button variant="outline" size="sm" className="mt-3 w-full text-xs sm:text-sm">
                        View Details →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Past Activities */}
        {pastEnrollments.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Past Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {pastEnrollments.map((enrollment) => (
                <Link key={enrollment.id} href="/history">
                  <Card className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
                    <CardHeader>
                      <CardTitle>{enrollment.activity.title}</CardTitle>
                      <CardDescription>
                        {new Date(enrollment.activity.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{enrollment.activity.description}</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        View History →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
