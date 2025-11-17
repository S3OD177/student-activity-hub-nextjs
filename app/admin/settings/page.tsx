"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Settings as SettingsIcon, Wrench } from "lucide-react"

export default function AdminSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role !== "admin") {
      router.push("/dashboard")
    } else {
      fetchSettings()
    }
  }, [status, session, router])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings/maintenance")
      const data = await response.json()
      setMaintenanceMode(data.enabled)
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMaintenance = async () => {
    try {
      const response = await fetch("/api/settings/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !maintenanceMode })
      })
      
      if (response.ok) {
        setMaintenanceMode(!maintenanceMode)
        toast({ title: `Maintenance mode ${!maintenanceMode ? "enabled" : "disabled"}` })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update settings", variant: "destructive" })
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 flex flex-col">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <SettingsIcon className="h-10 w-10" />
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system-wide configurations</p>
        </div>

        <div className="space-y-6">
          {/* Maintenance Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance Mode
              </CardTitle>
              <CardDescription>
                When enabled, non-admin users will see a maintenance page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Maintenance Mode</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Status: {maintenanceMode ? (
                      <span className="text-yellow-600 font-semibold">ACTIVE</span>
                    ) : (
                      <span className="text-green-600 font-semibold">DISABLED</span>
                    )}
                  </p>
                </div>
                <Button 
                  variant={maintenanceMode ? "destructive" : "default"}
                  onClick={toggleMaintenance}
                >
                  {maintenanceMode ? "Disable" : "Enable"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Point Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Point Rules</CardTitle>
              <CardDescription>Configure points awarded for different activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Event Attendance</Label>
                  <p className="text-2xl font-bold text-purple-600">10 points</p>
                </div>
                <div>
                  <Label>Workshop Completion</Label>
                  <p className="text-2xl font-bold text-purple-600">15 points</p>
                </div>
                <div>
                  <Label>Volunteer Hours (per hour)</Label>
                  <p className="text-2xl font-bold text-purple-600">10 points</p>
                </div>
                <div>
                  <Label>Competition Participation</Label>
                  <p className="text-2xl font-bold text-purple-600">20 points</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Note: Point rules are currently fixed. Custom rules coming soon.
              </p>
            </CardContent>
          </Card>

          {/* Departments */}
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>Manage academic departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Computer Science", "Engineering", "Business", "Arts", "Science"].map((dept) => (
                  <div key={dept} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {dept}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
