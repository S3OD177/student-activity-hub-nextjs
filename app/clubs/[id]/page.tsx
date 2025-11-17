"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Users, Calendar, MapPin, UserPlus, UserMinus } from "lucide-react"

export default function ClubDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [club, setClub] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isMember, setIsMember] = useState(false)

  useEffect(() => {
    fetchClub()
  }, [params.id])

  const fetchClub = async () => {
    try {
      const response = await fetch(`/api/clubs/${params.id}`)
      const data = await response.json()
      setClub(data)
      
      if (session) {
        const membership = data.memberships.find((m: any) => m.userId === parseInt(session.user.id))
        setIsMember(!!membership)
      }
    } catch (error) {
      console.error("Error fetching club:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async () => {
    try {
      const response = await fetch(`/api/clubs/${params.id}/join`, { method: "POST" })
      if (response.ok) {
        toast({ title: "Joined club successfully!" })
        fetchClub()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to join club", variant: "destructive" })
    }
  }

  const handleLeave = async () => {
    try {
      const response = await fetch(`/api/clubs/${params.id}/join`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Left club successfully!" })
        fetchClub()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to leave club", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-teal-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{club.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{club.department}</p>
            </div>
            {session && (
              isMember ? (
                <Button variant="outline" onClick={handleLeave}>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Leave Club
                </Button>
              ) : (
                <Button onClick={handleJoin}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Club
                </Button>
              )
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{club.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                {club.activities.length > 0 ? (
                  <div className="space-y-3">
                    {club.activities.map((activity: any) => (
                      <div key={activity.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => router.push(`/activities`)}>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-500 mt-2">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No upcoming events</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Members</span>
                  <span className="font-bold">{club._count.memberships}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Events</span>
                  <span className="font-bold">{club._count.activities}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Members ({club.memberships.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {club.memberships.slice(0, 5).map((membership: any) => (
                    <div key={membership.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm">{membership.user.fullName || membership.user.username}</span>
                    </div>
                  ))}
                  {club.memberships.length > 5 && (
                    <p className="text-sm text-gray-500 mt-2">+{club.memberships.length - 5} more</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
