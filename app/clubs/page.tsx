"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, Calendar } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function ClubsPage() {
  const router = useRouter()
  const { themeConfig } = useTheme()
  const [clubs, setClubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchClubs()
  }, [])

  const fetchClubs = async () => {
    try {
      const response = await fetch(`/api/clubs?search=${search}`)
      const data = await response.json()
      console.log("Clubs data:", data)
      if (Array.isArray(data)) {
        setClubs(data)
      } else {
        console.error("Invalid data format:", data)
        setClubs([])
      }
    } catch (error) {
      console.error("Error fetching clubs:", error)
      setClubs([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Student Clubs</h1>
          <p className="text-white/90 text-lg">Join clubs and connect with like-minded students</p>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchClubs()}
              className="pl-12 h-14 text-lg border-2 focus:border-green-500 dark:focus:border-green-400"
            />
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden group" onClick={() => router.push(`/clubs/${club.id}`)}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription>{club.department || "General"}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{club.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {club._count.memberships} members
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {club._count.activities} events
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clubs.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-gray-500">No clubs found</p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
