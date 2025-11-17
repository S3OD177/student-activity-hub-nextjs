"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Share2 } from "lucide-react"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function QRCodePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [qrData, setQrData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      fetchQRCode()
    }
  }, [status, session, router])

  const fetchQRCode = async () => {
    try {
      const response = await fetch("/api/qrcode")
      const data = await response.json()
      setQrData(data)
    } catch (error) {
      console.error("Error fetching QR code:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 flex flex-col">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <QrCode className="h-10 w-10" />
            My QR Code
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Use this for quick check-in at activities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle>Your Personal QR Code</CardTitle>
              <CardDescription>Scan this at activity check-in</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg mb-4">
                {/* QR Code would be generated here with a library like qrcode.react */}
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-indigo-600" />
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p>User ID: {qrData?.data?.userId}</p>
                <p className="font-mono text-xs mt-1">{qrData?.qrCode?.substring(0, 20)}...</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Save or Screenshot</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download this QR code or take a screenshot for quick access
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Show at Check-in</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Present your QR code when checking in to activities
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Instant Verification</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get verified instantly and earn attendance points
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Tip:</strong> Keep this QR code private. Don't share it publicly as it's linked to your account.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
