"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Award, TrendingUp, BookOpen, Bell, BarChart3, Trophy, Clock, MapPin, Star, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

const gradients = [
  "from-blue-600 via-purple-600 to-indigo-700",
  "from-green-600 via-teal-600 to-emerald-700",
  "from-purple-600 via-pink-600 to-rose-700",
  "from-orange-600 via-red-600 to-pink-700",
  "from-cyan-600 via-blue-600 to-indigo-700",
]

export default function HomePage() {
  const { t } = useLanguage()
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
              {t('landing.welcome')}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white">
              {t('landing.hero')}
              <span className="block text-yellow-300 drop-shadow-lg">{t('landing.heroHighlight')}</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('landing.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold">
                  {t('landing.getStarted')} →
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="text-lg px-10 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm">
                  {t('landing.signIn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('landing.featuresTitle')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t('landing.featuresSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('landing.activityCalendar')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.activityCalendarDesc')}</p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('landing.joinClubs')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.joinClubsDesc')}</p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('landing.earnBadges')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.earnBadgesDesc')}</p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('landing.trackProgress')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.trackProgressDesc')}</p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('landing.notifications')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.notificationsDesc')}</p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('landing.leaderboard')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.leaderboardDesc')}</p>
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
              <div className="text-white/90 text-lg">{t('landing.activeStudents')}</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">100+</div>
              <div className="text-white/90 text-lg">{t('landing.activities')}</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">50+</div>
              <div className="text-white/90 text-lg">{t('landing.clubs')}</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold mb-2 text-white">95%</div>
              <div className="text-white/90 text-lg">{t('landing.satisfaction')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('landing.howItWorks')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t('landing.howItWorksSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
              1
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">{t('landing.step1')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('landing.step1Desc')}</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
              2
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">{t('landing.step2')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('landing.step2Desc')}</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
              3
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">{t('landing.step3')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('landing.step3Desc')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('landing.ctaTitle')}</h2>
          <p className="text-xl text-gray-300 mb-10">{t('landing.ctaSubtitle')}</p>
          <Link href="/register">
            <Button size="lg" className={`text-lg px-12 py-6 bg-gradient-to-r ${gradients[currentGradient]} hover:opacity-90 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-1000`}>
              {t('landing.createAccount')} →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
