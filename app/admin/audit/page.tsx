"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AuditLogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
    else if (session?.user.role !== "admin") router.push("/dashboard")
    else fetchLogs()
  }, [status, session, router])

  const fetchLogs = async () => {
    try {
      const response = await fetch(`/api/audit${filter ? `?action=${filter}` : ''}`)
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
          <div className="flex gap-2">
            <Button variant={filter === "" ? "default" : "outline"} onClick={() => { setFilter(""); fetchLogs() }}>All</Button>
            <Button variant={filter === "CREATE" ? "default" : "outline"} onClick={() => { setFilter("CREATE"); fetchLogs() }}>Create</Button>
            <Button variant={filter === "DELETE" ? "default" : "outline"} onClick={() => { setFilter("DELETE"); fetchLogs() }}>Delete</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {logs.map((log: any) => (
                <div key={log.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">{log.action}</span> on <span className="text-blue-600">{log.entityType}</span>
                    {log.entityId && <span className="text-gray-500"> #{log.entityId}</span>}
                  </div>
                  <span className="text-sm text-gray-500">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
