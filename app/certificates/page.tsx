"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Calendar } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import Link from "next/link"

export default function CertificatesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { themeConfig } = useTheme()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      fetchEnrollments()
    }
  }, [status, session, router])

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("/api/enrollments")
      const data = await response.json()
      
      // Filter for completed and attended activities
      const completedEnrollments = data.filter((enrollment: any) => {
        const activityDate = new Date(enrollment.activity.date)
        const now = new Date()
        return activityDate < now && enrollment.attended
      })
      
      setEnrollments(completedEnrollments)
    } catch (error) {
      console.error("Error fetching enrollments:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          <div className="flex items-center gap-4">
            <Award className="h-16 w-16" />
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white">My Certificates</h1>
              <p className="text-white/90 text-lg">View and download your achievement certificates</p>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">No certificates available yet</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
                Complete activities to earn certificates
              </p>
              <Link href="/activities">
                <Button>Browse Activities</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <Card key={enrollment.id} className="hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-lg">
                    {enrollment.activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(enrollment.activity.date).toLocaleDateString()}
                    </div>
                    {enrollment.certificateIssued && (
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <Award className="h-4 w-4 mr-2" />
                        Certificate Issued
                      </div>
                    )}
                  </div>
                  <Link href={`/certificates/${enrollment.id}`}>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
