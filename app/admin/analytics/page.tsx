"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import { 
  Users, 
  Calendar, 
  Award, 
  TrendingUp, 
  Activity,
  UserCheck,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

export default function AdminAnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { themeConfig } = useTheme()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")
  const [analytics, setAnalytics] = useState<any>({
    overview: {},
    activities: {},
    users: {},
    trends: {},
    topActivities: [],
    recentEnrollments: []
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role !== "admin") {
      router.push("/dashboard")
    } else {
      fetchAnalytics()
    }
  }, [status, session, router])

  const fetchAnalytics = async () => {
    try {
      const [activitiesRes, usersRes] = await Promise.all([
        fetch("/api/activities"),
        fetch("/api/users")
      ])

      const activities = await activitiesRes.json()
      const users = await usersRes.json()

      // Calculate analytics
      const now = new Date()
      const totalActivities = activities.length
      const upcomingActivities = activities.filter((a: any) => new Date(a.date) > now).length
      const pastActivities = activities.filter((a: any) => new Date(a.date) <= now).length
      const totalEnrollments = activities.reduce((sum: number, a: any) => sum + (a._count?.enrollments || 0), 0)
      const totalUsers = users.length
      const activeUsers = users.filter((u: any) => u.role === "user").length
      
      // Attendance rate
      let totalAttended = 0
      let totalPastEnrollments = 0
      activities.forEach((activity: any) => {
        if (new Date(activity.date) <= now && activity.enrollments) {
          activity.enrollments.forEach((e: any) => {
            totalPastEnrollments++
            if (e.attended) totalAttended++
          })
        }
      })
      const attendanceRate = totalPastEnrollments > 0 ? (totalAttended / totalPastEnrollments * 100).toFixed(1) : 0

      // Certificates issued
      let certificatesIssued = 0
      activities.forEach((activity: any) => {
        if (activity.enrollments) {
          certificatesIssued += activity.enrollments.filter((e: any) => e.certificateIssued).length
        }
      })

      // Category distribution
      const categoryCount: any = {}
      activities.forEach((a: any) => {
        const cat = a.category || 'General'
        categoryCount[cat] = (categoryCount[cat] || 0) + 1
      })

      // Average enrollment per activity
      const avgEnrollment = totalActivities > 0 ? (totalEnrollments / totalActivities).toFixed(1) : 0

      // Capacity utilization
      const totalCapacity = activities.reduce((sum: number, a: any) => sum + (a.maxStudents || 0), 0)
      const capacityUtilization = totalCapacity > 0 ? (totalEnrollments / totalCapacity * 100).toFixed(1) : 0

      // Top performing activities
      const topActivities = activities
        .sort((a: any, b: any) => (b._count?.enrollments || 0) - (a._count?.enrollments || 0))
        .slice(0, 5)

      // Growth metrics (mock data - would be calculated from historical data)
      const growthMetrics = {
        activitiesGrowth: 12.5,
        enrollmentsGrowth: 18.3,
        usersGrowth: 8.7,
        attendanceGrowth: 5.2
      }

      // Activity status breakdown
      const statusBreakdown = {
        active: upcomingActivities,
        completed: pastActivities,
        cancelled: 0 // Would come from database
      }

      setAnalytics({
        overview: {
          totalActivities,
          upcomingActivities,
          pastActivities,
          totalEnrollments,
          totalUsers,
          activeUsers,
          certificatesIssued,
          attendanceRate,
          avgEnrollment,
          capacityUtilization
        },
        categories: categoryCount,
        activities,
        users,
        topActivities,
        growthMetrics,
        statusBreakdown
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchAnalytics()
  }

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analytics-${new Date().toISOString()}.json`
    link.click()
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

  const { overview, categories, topActivities, growthMetrics, statusBreakdown } = analytics

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t('analytics.title')}</h1>
              <p className="text-white/90 text-lg">{t('analytics.overview')}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleRefresh} 
                variant="secondary" 
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                {t('analytics.refresh')}
              </Button>
              <Button onClick={exportData} variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                {t('analytics.exportData')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                {growthMetrics?.activitiesGrowth > 0 ? (
                  <ArrowUp className="h-5 w-5 text-green-600" />
                ) : growthMetrics?.activitiesGrowth < 0 ? (
                  <ArrowDown className="h-5 w-5 text-red-600" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.totalActivities')}</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{overview.totalActivities || 0}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {overview.upcomingActivities} {t('activities.upcoming').toLowerCase()}
                </p>
                {growthMetrics?.activitiesGrowth !== undefined && (
                  <span className={`text-xs font-medium ${
                    growthMetrics.activitiesGrowth > 0 ? 'text-green-600' : 
                    growthMetrics.activitiesGrowth < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {growthMetrics.activitiesGrowth > 0 ? '+' : ''}{growthMetrics.activitiesGrowth}%
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                {growthMetrics?.enrollmentsGrowth > 0 ? (
                  <ArrowUp className="h-5 w-5 text-green-600" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.totalEnrollments')}</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{overview.totalEnrollments || 0}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Avg: {overview.avgEnrollment} per activity
                </p>
                {growthMetrics?.enrollmentsGrowth !== undefined && (
                  <span className="text-xs font-medium text-green-600">
                    +{growthMetrics.enrollmentsGrowth}%
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <UserCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.attendanceRate')}</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{overview.attendanceRate}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Past activities
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.certificatesIssued')}</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{overview.certificatesIssued || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                To students
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Status Overview - First */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {t('analytics.statusOverview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-950/30 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">{t('analytics.active')}</p>
                </div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {statusBreakdown?.active || 0}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('activities.upcoming')} {t('nav.activities').toLowerCase()}</p>
              </div>
              
              <div className="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/30 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{t('analytics.completed')}</p>
                </div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {statusBreakdown?.completed || 0}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('activities.past')} {t('nav.activities').toLowerCase()}</p>
              </div>
              
              <div className="p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-950/30 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">{t('analytics.cancelled')}</p>
                </div>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {statusBreakdown?.cancelled || 0}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('analytics.cancelled')} {t('nav.activities').toLowerCase()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Activities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('analytics.topActivities')}
            </CardTitle>
            <CardDescription>{t('analytics.insights')}</CardDescription>
          </CardHeader>
          <CardContent>
            {topActivities && topActivities.length > 0 ? (
              <div className="space-y-3">
                {topActivities.map((activity: any, index: number) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' :
                        'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {activity._count?.enrollments || 0}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">enrollments</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No activities yet</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('analytics.insights')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/30 rounded">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">{t('analytics.engagementRate')}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {overview.activeUsers > 0 && overview.totalActivities > 0 
                    ? ((overview.totalEnrollments / (overview.activeUsers * overview.totalActivities)) * 100).toFixed(1) 
                    : 0}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Users actively participating</p>
              </div>
              
              <div className="p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-950/30 rounded">
                <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">{t('analytics.certificateCompletion')}</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {overview.totalEnrollments > 0 
                    ? ((overview.certificatesIssued / overview.totalEnrollments) * 100).toFixed(1) 
                    : 0}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Of enrollments completed</p>
              </div>
              
              <div className="p-4 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-950/30 rounded">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-1">{t('analytics.successRate')}</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{overview.attendanceRate}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Students attending activities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
