"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search, Heart, Filter, Star, Clock, TrendingUp, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ActivityBadge } from "@/components/activity-badge"
import { Progress } from "@/components/ui/progress"
import { ActivityCardSkeleton } from "@/components/loading-skeleton"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/contexts/theme-context"

export default function ActivitiesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { themeConfig } = useTheme()
  const [activities, setActivities] = useState<any[]>([])
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    console.log("Activities page mounted, session:", session)
    fetchActivities()
    fetchEnrollments()
    if (session) {
      fetchFavorites()
    }
  }, [session])

  const fetchActivities = async () => {
    try {
      console.log("Fetching activities...")
      const response = await fetch("/api/activities")
      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Activities data:", data)
      if (Array.isArray(data)) {
        setActivities(data)
      } else {
        console.error("Invalid data format")
        setActivities([])
      }
    } catch (error) {
      console.error("Error fetching activities:", error)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("/api/enrollments")
      if (response.ok) {
        const data = await response.json()
        setEnrollments(Array.isArray(data) ? data : [])
      } else {
        // User not logged in or error - set empty array
        setEnrollments([])
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error)
      setEnrollments([])
    }
  }

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      console.error("Error fetching favorites:", error)
    }
  }

  const toggleFavorite = async (activityId: number) => {
    const isFavorited = favorites.some(f => f.activityId === activityId)
    try {
      if (isFavorited) {
        await fetch(`/api/favorites?activityId=${activityId}`, { method: "DELETE" })
        setFavorites(favorites.filter(f => f.activityId !== activityId))
        toast({ title: "Removed from favorites" })
      } else {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activityId })
        })
        const newFav = await response.json()
        setFavorites([...favorites, newFav])
        toast({ title: "Added to favorites" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" })
    }
  }

  const isEnrolled = (activityId: number) => {
    return enrollments.some((e) => e.activityId === activityId)
  }

  const handleEnroll = async (activityId: number) => {
    if (!session) {
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Enrolled successfully!",
        })
        fetchEnrollments()
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
        description: "Failed to enroll",
        variant: "destructive",
      })
    }
  }

  const handleUnenroll = async (activityId: number) => {
    try {
      const response = await fetch(`/api/enrollments?activityId=${activityId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Unenrolled successfully!",
        })
        fetchEnrollments()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unenroll",
        variant: "destructive",
      })
    }
  }

  const categories = ["all", ...new Set(activities.map(a => a.category || "General"))]

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(search.toLowerCase()) ||
                         activity.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter
    
    // Status filter
    let matchesStatus = true
    if (statusFilter === "upcoming") {
      matchesStatus = new Date(activity.date) > new Date()
    } else if (statusFilter === "available") {
      const enrollmentCount = activity._count?.enrollments || 0
      matchesStatus = activity.maxStudents === 0 || enrollmentCount < activity.maxStudents
    } else if (statusFilter === "enrolled") {
      matchesStatus = enrollments.some(e => e.activityId === activity.id)
    }
    
    return matchesSearch && matchesCategory && matchesStatus
  }).sort((a, b) => {
    if (sortBy === "date") return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (sortBy === "popular") return (b._count?.enrollments || 0) - (a._count?.enrollments || 0)
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3 text-white">Discover Activities</h1>
          <p className="text-white/90 text-lg">Find and join activities that match your interests</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activities.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{enrollments.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600 dark:text-green-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Favorites</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{favorites.length}</p>
                </div>
                <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {activities.filter(a => new Date(a.date) > new Date()).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 text-lg shadow-lg border-2 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(categoryFilter !== "all" || statusFilter !== "all") && (
                  <Badge variant="secondary" className="ml-1">Active</Badge>
                )}
              </Button>
              
              <div className="flex gap-2 flex-1 overflow-x-auto">
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {categoryFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCategoryFilter("all")} />
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {statusFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                  </Badge>
                )}
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              >
                <option value="date">Sort: By Date</option>
                <option value="popular">Sort: Most Popular</option>
                <option value="newest">Sort: Newest First</option>
              </select>
            </div>
            
            {/* Expandable Filters */}
            {showFilters && (
              <Card className="mt-4">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat}
                          variant={categoryFilter === cat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCategoryFilter(cat)}
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={statusFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={statusFilter === "upcoming" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("upcoming")}
                      >
                        Upcoming
                      </Button>
                      <Button
                        variant={statusFilter === "available" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("available")}
                      >
                        Available Spots
                      </Button>
                      <Button
                        variant={statusFilter === "enrolled" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("enrolled")}
                      >
                        My Enrollments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <ActivityCardSkeleton key={i} />)}
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <CardContent className="py-16 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No activities found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredActivities.map((activity) => {
              const enrollmentCount = activity._count?.enrollments || 0
              const progress = activity.maxStudents > 0 ? (enrollmentCount / activity.maxStudents) * 100 : 0
              const isFavorited = favorites.some(f => f.activityId === activity.id)
              
              return (
              <Link key={activity.id} href={`/activities/${activity.id}`}>
                <Card className="flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 bg-white dark:bg-gray-900 cursor-pointer overflow-hidden group">
                  <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <ActivityBadge activity={activity} enrollmentCount={enrollmentCount} />
                    {session && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleFavorite(activity.id)
                        }}
                        className="h-8 w-8"
                      >
                        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                  {activity.category && (
                    <Badge variant="outline" className="mt-2 w-fit">{activity.category}</Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{activity.description}</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {activity.location}
                    </div>
                    {activity.maxStudents > 0 && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="flex items-center"><Users className="h-3 w-3 mr-1" />{enrollmentCount}/{activity.maxStudents}</span>
                          <span>{Math.round(progress)}% full</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                    {activity.academicLevel && (
                      <p className="text-gray-500 dark:text-gray-400">📚 Level: {activity.academicLevel}</p>
                    )}
                    {activity.major && (
                      <p className="text-gray-500 dark:text-gray-400">🎓 Major: {activity.major}</p>
                    )}
                    {activity.instructor && (
                      <p className="text-gray-500 dark:text-gray-400">👨‍🏫 {activity.instructor}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {session ? (
                    isEnrolled(activity.id) ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault()
                          handleUnenroll(activity.id)
                        }}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={(e) => {
                        e.preventDefault()
                        handleEnroll(activity.id)
                      }}>
                        Enroll Now
                      </Button>
                    )
                  ) : (
                    <Button className="w-full" onClick={(e) => {
                      e.preventDefault()
                      router.push("/login")
                    }}>
                      Login to Enroll
                    </Button>
                  )}
                </CardFooter>
              </Card>
              </Link>
            )})}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
