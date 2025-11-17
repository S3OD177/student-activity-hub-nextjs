"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useTheme } from "@/contexts/theme-context"

type ViewMode = "month" | "week" | "agenda"

export default function CalendarPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { themeConfig } = useTheme()
  const [activities, setActivities] = useState<any[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [selectedClub, setSelectedClub] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchActivities()
    fetchClubs()
  }, [])

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

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/clubs")
      const data = await response.json()
      setClubs(data)
    } catch (error) {
      console.error("Error fetching clubs:", error)
    }
  }

  const generateGoogleCalendarLink = (activity: any) => {
    const startDate = new Date(activity.date)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activity.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(activity.description)}&location=${encodeURIComponent(activity.location)}`
  }

  const downloadICS = (activity: any) => {
    const startDate = new Date(activity.date)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${activity.title}
DESCRIPTION:${activity.description}
LOCATION:${activity.location}
END:VEVENT
END:VCALENDAR`
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activity.title}.ics`
    a.click()
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const getActivitiesForDate = (date: Date) => {
    return activities.filter((activity) => {
      const activityDate = new Date(activity.date)
      return (
        activityDate.getDate() === date.getDate() &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const selectedActivities = selectedDate ? getActivitiesForDate(selectedDate) : []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Event Calendar</h1>
          <p className="text-white/90 text-lg">View all upcoming activities and events</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading calendar...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {monthNames[month]} {year}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={previousMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                        Today
                      </Button>
                      <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {/* Day headers */}
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-2"
                      >
                        {day}
                      </div>
                    ))}

                    {/* Calendar days */}
                    {days.map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />
                      }

                      const date = new Date(year, month, day)
                      const dayActivities = getActivitiesForDate(date)
                      const isToday =
                        date.toDateString() === new Date().toDateString()
                      const isSelected =
                        selectedDate?.toDateString() === date.toDateString()
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`aspect-square p-2 rounded-lg border transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-950 dark:border-blue-500"
                              : isToday
                              ? "border-blue-400 bg-blue-50 dark:bg-blue-950/50 dark:border-blue-600"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                          } ${isPast ? "opacity-60" : ""}`}
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{day}</div>
                          {dayActivities.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {dayActivities.slice(0, 2).map((activity, i) => (
                                <div
                                  key={i}
                                  className={`text-xs px-1 py-0.5 rounded truncate ${
                                    isPast
                                      ? "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                      : "bg-blue-500 dark:bg-blue-600 text-white"
                                  }`}
                                  title={activity.title}
                                >
                                  {activity.title}
                                </div>
                              ))}
                              {dayActivities.length > 2 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  +{dayActivities.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Date Activities */}
            <div>
              <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </CardTitle>
                  <CardDescription>
                    {selectedActivities.length > 0
                      ? `${selectedActivities.length} ${
                          selectedActivities.length === 1 ? "activity" : "activities"
                        }`
                      : "No activities"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedActivities.length > 0 ? (
                    <div className="space-y-4">
                      {selectedActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="p-4 border rounded-lg hover:border-blue-300 transition-colors"
                        >
                          <h3 className="font-semibold text-lg mb-2">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {activity.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {activity.location}
                          </div>
                          {activity.instructor && (
                            <p className="text-sm text-gray-500 mt-2">
                              Instructor: {activity.instructor}
                            </p>
                          )}
                          <div className="mt-3">
                            <Link href="/activities">
                              <Button size="sm" className="w-full">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : selectedDate ? (
                    <p className="text-center text-gray-500 py-8">
                      No activities scheduled for this date
                    </p>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      Click on a date to see activities
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 border-blue-400 bg-blue-50 mr-2"></div>
                    <span>Today</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-50 mr-2"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-blue-500 mr-2"></div>
                    <span>Upcoming Activity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded bg-gray-300 mr-2"></div>
                    <span>Past Activity</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
