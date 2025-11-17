"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, CheckCircle, Clock } from "lucide-react"

export default function ActivityHistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [history, setHistory] = useState<any>({ past: [], upcoming: [] })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      fetchHistory()
    }
  }, [status, session, router])

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history")
      const data = await response.json()
      setHistory(data)
    } catch (error) {
      console.error("Error fetching history:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Activity History</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your participation and achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{history.all?.length || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Activities</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{history.upcoming?.length || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{history.past?.length || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {history.past?.filter((e: any) => e.activity.reviews?.length > 0).length || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reviewed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            onClick={() => setActiveTab("upcoming")}
          >
            <Clock className="h-4 w-4 mr-2" />
            Upcoming ({history.upcoming?.length || 0})
          </Button>
          <Button
            variant={activeTab === "past" ? "default" : "outline"}
            onClick={() => setActiveTab("past")}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Past ({history.past?.length || 0})
          </Button>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {(activeTab === "upcoming" ? history.upcoming : history.past).length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-gray-500">No {activeTab} activities</p>
              </CardContent>
            </Card>
          ) : (
            (activeTab === "upcoming" ? history.upcoming : history.past).map((enrollment: any) => (
              <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{enrollment.activity.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(enrollment.activity.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {enrollment.activity.location}
                        </span>
                      </CardDescription>
                    </div>
                    {activeTab === "past" && enrollment.activity.reviews?.length > 0 && (
                      <Badge className="bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Reviewed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{enrollment.activity.description}</p>
                  {activeTab === "past" && enrollment.activity.reviews?.length === 0 && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <Star className="h-4 w-4 mr-2" />
                      Leave a Review
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
