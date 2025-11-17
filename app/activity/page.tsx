"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Award, TrendingUp } from "lucide-react"

export default function ActivityTrackingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activities, setActivities] = useState<any[]>([])
  const [stats, setStats] = useState({ totalPoints: 0, totalHours: 0, totalEvents: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      fetchActivityData()
    }
  }, [status, session, router])

  const fetchActivityData = async () => {
    try {
      const [historyRes, profileRes] = await Promise.all([
        fetch("/api/history"),
        fetch("/api/profile")
      ])
      
      const historyData = await historyRes.json()
      const profileData = await profileRes.json()

      setActivities(historyData.past || [])
      setStats({
        totalPoints: profileData.totalPoints || 0,
        totalHours: Math.floor((profileData.totalPoints || 0) / 10), // 10 points = 1 hour
        totalEvents: historyData.past?.length || 0
      })
    } catch (error) {
      console.error("Error fetching activity data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-orange-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-orange-900 flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Activity Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Your participation history and achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Points</p>
                  <p className="text-4xl font-bold">{stats.totalPoints}</p>
                </div>
                <Award className="h-12 w-12 text-orange-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Volunteer Hours</p>
                  <p className="text-4xl font-bold">{stats.totalHours}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Events Attended</p>
                  <p className="text-4xl font-bold">{stats.totalEvents}</p>
                </div>
                <Calendar className="h-12 w-12 text-green-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Attended Events</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Event</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Location</th>
                      <th className="text-left p-4 font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((enrollment: any) => (
                      <tr key={enrollment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4">{enrollment.activity.title}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {new Date(enrollment.activity.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {enrollment.activity.location}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-sm font-semibold">
                            +10
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No activities attended yet</p>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
