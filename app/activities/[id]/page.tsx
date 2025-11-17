"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, MapPin, Users, Clock, User, Star, Heart, MessageSquare, Award, BookOpen, GraduationCap, Share2, Download, Info, Edit, Trash2, UserCheck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { Progress } from "@/components/ui/progress"

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [activity, setActivity] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { themeConfig } = useTheme()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      fetchActivity()
    }
  }, [params.id, session, status, router])

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/activities/${params.id}`)
      const data = await response.json()
      setActivity(data)
      
      if (session) {
        const enrollment = data.enrollments?.find((e: any) => e.userId === parseInt(session.user.id))
        setIsEnrolled(!!enrollment)
      }
    } catch (error) {
      console.error("Error fetching activity:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId: parseInt(params.id) })
      })
      
      if (response.ok) {
        toast({ title: "Success", description: "Enrolled successfully!" })
        fetchActivity()
      } else {
        const error = await response.json()
        toast({ title: "Error", description: error.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to enroll", variant: "destructive" })
    }
  }

  const handleUnenroll = async () => {
    try {
      const response = await fetch("/api/enrollments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId: parseInt(params.id) })
      })
      
      if (response.ok) {
        toast({ title: "Success", description: "Unenrolled successfully!" })
        fetchActivity()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to unenroll", variant: "destructive" })
    }
  }

  const handleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId: parseInt(params.id) })
      })
      
      if (response.ok) {
        setIsFavorite(!isFavorite)
        toast({ title: isFavorite ? "Removed from favorites" : "Added to favorites" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update favorites", variant: "destructive" })
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/activities/${params.id}`, {
        method: "DELETE"
      })
      
      if (response.ok) {
        toast({ title: "Success", description: "Activity deleted successfully" })
        router.push("/admin")
      } else {
        toast({ title: "Error", description: "Failed to delete activity", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete activity", variant: "destructive" })
    }
  }

  const handleIssueCertificates = async () => {
    try {
      const response = await fetch("/api/admin/certificates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId: parseInt(params.id) })
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Success",
          description: `Issued ${data.count} certificate(s)`
        })
        fetchActivity()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to issue certificates", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Activity not found</h2>
          <Link href="/activities">
            <Button>Back to Activities</Button>
          </Link>
        </div>
      </div>
    )
  }

  const spotsLeft = activity.maxStudents - (activity._count?.enrollments || 0)
  const isPast = new Date(activity.date) < new Date()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${themeConfig.primary} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/activities">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/10">← Back to Activities</Button>
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {activity.category && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                    {activity.category}
                  </span>
                )}
                {isPast && (
                  <span className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                    Ended
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{activity.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {new Date(activity.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {new Date(activity.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {activity.location}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {session?.user.role === "admin" ? (
                <>
                  <Button variant="secondary" onClick={() => router.push(`/admin?edit=${params.id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" size="icon" onClick={handleFavorite}>
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {activity._count?.enrollments || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {activity.maxStudents}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600 dark:text-green-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Spots Left</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {spotsLeft}
                  </p>
                </div>
                <Award className="h-8 w-8 text-orange-600 dark:text-orange-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Favorites</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {activity._count?.favorites || 0}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  About This Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{activity.description}</p>
              </CardContent>
            </Card>

            {/* Enrollment Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Current Enrollment</span>
                    <span className="font-semibold">{activity._count?.enrollments || 0} / {activity.maxStudents}</span>
                  </div>
                  <Progress value={(activity._count?.enrollments || 0) / activity.maxStudents * 100} className="h-3" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Activity is full'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Activity Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {activity.instructor && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{activity.instructor}</p>
                      </div>
                    </div>
                  )}
                  {activity.category && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{activity.category}</p>
                      </div>
                    </div>
                  )}
                  {activity.academicLevel && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Academic Level</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{activity.academicLevel}</p>
                      </div>
                    </div>
                  )}
                  {activity.major && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Award className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Major</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{activity.major}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Hands-on experience and practical skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Certificate of completion upon attendance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Networking opportunities with peers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Points added to your leaderboard score</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enrolled Students List - Admin Only */}
            {session?.user.role === "admin" && activity.enrollments && activity.enrollments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Enrolled Students ({activity.enrollments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {activity.enrollments.map((enrollment: any) => (
                      <div
                        key={enrollment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{enrollment.user?.fullName || enrollment.user?.username}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{enrollment.user?.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {enrollment.attended && (
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                              Attended
                            </span>
                          )}
                          {enrollment.certificateIssued && (
                            <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Controls */}
            {session?.user.role === "admin" && (
              <Card className="sticky top-4 border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-blue-50 dark:bg-blue-950">
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <Award className="h-5 w-5" />
                    Admin Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  <Button 
                    onClick={() => router.push(`/admin?edit=${params.id}`)}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Activity
                  </Button>
                  
                  <Button 
                    onClick={handleIssueCertificates}
                    className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                    disabled={isPast === false}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Issue Certificates
                  </Button>

                  <Button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full justify-start"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Activity
                  </Button>

                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Activity Status</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Enrolled:</span>
                        <span className="font-semibold">{activity._count?.enrollments || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attended:</span>
                        <span className="font-semibold text-green-600">
                          {activity.enrollments?.filter((e: any) => e.attended).length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Certificates Issued:</span>
                        <span className="font-semibold text-blue-600">
                          {activity.enrollments?.filter((e: any) => e.certificateIssued).length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enrollment Card */}
            <Card className={session?.user.role === "admin" ? "" : "sticky top-4"}>
              <CardHeader>
                <CardTitle>Enrollment</CardTitle>
                <CardDescription>
                  {spotsLeft > 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {spotsLeft} spots available
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-semibold">Activity Full</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {session?.user.role !== "admin" && (
                  <>
                    {isPast ? (
                      <Button disabled className="w-full h-12 text-lg">Event Ended</Button>
                    ) : isEnrolled ? (
                      <>
                        <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-sm text-green-800 dark:text-green-200 font-medium text-center">
                            ✓ You're enrolled in this activity
                          </p>
                        </div>
                        <Button variant="outline" onClick={handleUnenroll} className="w-full">
                          Unenroll
                        </Button>
                      </>
                    ) : spotsLeft > 0 ? (
                      <Button onClick={handleEnroll} className="w-full h-12 text-lg">
                        Enroll Now
                      </Button>
                    ) : (
                      <Button disabled className="w-full h-12 text-lg">Activity Full</Button>
                    )}
                  </>
                )}
                
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Date</span>
                    <span className="font-medium">{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Time</span>
                    <span className="font-medium">{new Date(activity.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span className="font-medium text-right">{activity.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.print()}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Activity
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleFavorite}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Delete Activity?</CardTitle>
              <CardDescription>
                This action cannot be undone. This will permanently delete the activity and all associated enrollments.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button
                variant="destructive"
                onClick={() => {
                  handleDelete()
                  setShowDeleteConfirm(false)
                }}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
