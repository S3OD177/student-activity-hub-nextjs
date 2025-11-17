"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CertificateGenerator } from "@/components/certificate-generator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CertificateDetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [enrollment, setEnrollment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      fetchCertificate()
    }
  }, [status, session, router, params.id])

  const fetchCertificate = async () => {
    try {
      const response = await fetch(`/api/certificates?enrollmentId=${params.id}`)
      if (!response.ok) {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to load certificate",
          variant: "destructive",
        })
        router.push("/certificates")
        return
      }
      const data = await response.json()
      setEnrollment(data)
    } catch (error) {
      console.error("Error fetching certificate:", error)
      toast({
        title: "Error",
        description: "Failed to load certificate",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!enrollment.certificateIssued) {
      try {
        await fetch("/api/certificates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollmentId: enrollment.id }),
        })
        toast({
          title: "Success",
          description: "Certificate downloaded successfully!",
        })
      } catch (error) {
        console.error("Error issuing certificate:", error)
      }
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

  if (!enrollment) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Link href="/certificates">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Certificates
          </Button>
        </Link>

        <CertificateGenerator
          userName={enrollment.user.fullName || enrollment.user.username}
          activityTitle={enrollment.activity.title}
          activityDate={enrollment.activity.date}
          enrollmentId={enrollment.id}
          onDownload={handleDownload}
        />
      </main>
      
      <Footer />
    </div>
  )
}
