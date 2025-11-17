"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function LeaderboardPage() {
  const { themeConfig } = useTheme()
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard")
      const data = await response.json()
      setLeaderboard(data)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-8 w-8 text-yellow-500" />
    if (index === 1) return <Medal className="h-8 w-8 text-gray-400" />
    if (index === 2) return <Medal className="h-8 w-8 text-orange-600" />
    return <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-yellow-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-2 text-white">Leaderboard</h1>
          <p className="text-white/90 text-lg">Top performing students this term</p>
        </div>
      </div>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className="md:mt-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="pt-6 text-center">
                <Medal className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{leaderboard[1]?.fullName || leaderboard[1]?.username}</div>
                <div className="text-3xl font-bold text-gray-600 my-2">{leaderboard[1]?.totalPoints}</div>
                <div className="text-sm text-gray-500">points</div>
                <div className="flex justify-center gap-4 mt-2 text-xs">
                  <span>{leaderboard[1]?._count?.enrollments} activities</span>
                  <span>{leaderboard[1]?._count?.badges} badges</span>
                </div>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 border-4 border-yellow-600 shadow-2xl transform scale-105">
              <CardContent className="pt-6 text-center">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-2" />
                <div className="text-3xl font-bold">{leaderboard[0]?.fullName || leaderboard[0]?.username}</div>
                <div className="text-4xl font-bold text-yellow-600 my-2">{leaderboard[0]?.totalPoints}</div>
                <div className="text-sm text-gray-600">points</div>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  <span>{leaderboard[0]?._count?.enrollments} activities</span>
                  <span>{leaderboard[0]?._count?.badges} badges</span>
                </div>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="md:mt-8 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800">
              <CardContent className="pt-6 text-center">
                <Medal className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{leaderboard[2]?.fullName || leaderboard[2]?.username}</div>
                <div className="text-3xl font-bold text-orange-600 my-2">{leaderboard[2]?.totalPoints}</div>
                <div className="text-sm text-gray-500">points</div>
                <div className="flex justify-center gap-4 mt-2 text-xs">
                  <span>{leaderboard[2]?._count?.enrollments} activities</span>
                  <span>{leaderboard[2]?._count?.badges} badges</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rest of Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.slice(3).map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      {getRankIcon(index + 3)}
                    </div>
                    <div>
                      <div className="font-semibold">{user.fullName || user.username}</div>
                      <div className="text-sm text-gray-500">
                        {user._count.enrollments} activities • {user._count.badges} badges
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{user.totalPoints}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
