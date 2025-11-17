"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Award, TrendingUp, BookOpen, Bell, BarChart3, Trophy, Clock, MapPin, Star, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

const gradients = [
  "from-blue-600 via-purple-600 to-indigo-700",
  "from-green-600 via-teal-600 to-emerald-700",
  "from-purple-600 via-pink-600 to-rose-700",
  "from-orange-600 via-red-600 to-pink-700",
  "from-cyan-600 via-blue-600 to-indigo-700",
]

export default function HomePage() {
  const [currentGradient, setCurrentGradient] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length)
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${gradients[currentGradient]} text-white overflow-hidden transition-all duration-1000`}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-white">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Welcome to Your Campus Hub
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white">
              Discover & Join
              <span className="block text-yellow-300 drop-shadow-lg">Amazing Activities</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with your interests, meet new people, and enhance your university experience
              through engaging activities, clubs, and events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold">
                  Get Started Free →
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Powerful features to enhance your campus experience</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Activity Calendar</h3>
              <p className="text-gray-600 dark:text-gray-300">View all events in an interactive calendar with filters and export options.</p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Join Clubs</h3>
              <p className="text-gray-600 dark:text-gray-300">Connect with student clubs and organizations that match your interests.</p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Earn Badges</h3>
              <p className="text-gray-600 dark:text-gray-300">Get recognized for your participation and achievements with digital badges.</p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">Monitor your participation with detailed analytics and insights.</p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Smart Notifications</h3>
              <p className="text-gray-600 dark:text-gray-300">Stay updated with real-time notifications about your enrolled activities.</p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Leaderboard</h3>
              <p className="text-gray-600 dark:text-gray-300">Compete with peers and see top performers on the activity leaderboard.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`relative bg-gradient-to-r ${gradients[currentGradient]} text-white py-20 overflow-hidden transition-all duration-1000`}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">500+</div>
              <div className="text-white/90 text-lg">Active Students</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">100+</div>
              <div className="text-white/90 text-lg">Activities</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">50+</div>
              <div className="text-white/90 text-lg">Clubs</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">95%</div>
              <div className="text-white/90 text-lg">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Get started in three simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
              1
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Create Account</h3>
            <p className="text-gray-600 dark:text-gray-400">Sign up with your university email and set up your profile in minutes.</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
              2
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Browse & Join</h3>
            <p className="text-gray-600 dark:text-gray-400">Explore activities and clubs that match your interests and enroll instantly.</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
              3
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Track & Grow</h3>
            <p className="text-gray-600 dark:text-gray-400">Attend events, earn badges, and watch your participation portfolio grow.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of students already using Activity Hub</p>
          <Link href="/register">
            <Button size="lg" className={`text-lg px-12 py-6 bg-gradient-to-r ${gradients[currentGradient]} hover:opacity-90 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-1000`}>
              Create Free Account →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
