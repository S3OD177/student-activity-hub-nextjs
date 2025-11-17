"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function CheckInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session && token) {
      handleCheckIn()
    }
  }, [status, session, token])

  const handleCheckIn = async () => {
    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || "Check-in failed")
      }
    } catch (err) {
      setError("An error occurred during check-in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Event Check-In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {loading ? (
              <div className="py-8">
                <Loader2 className="h-16 w-16 animate-spin mx-auto text-blue-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Processing check-in...</p>
              </div>
            ) : success ? (
              <div className="py-8">
                <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">Check-In Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">You've been checked in to the event. +10 points earned!</p>
                <Button onClick={() => router.push("/dashboard")}>
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <XCircle className="h-16 w-16 mx-auto text-red-600 mb-4" />
                <h2 className="text-2xl font-bold text-red-600 mb-2">Check-In Failed</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
