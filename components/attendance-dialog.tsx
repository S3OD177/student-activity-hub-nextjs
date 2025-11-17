"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { UserCheck, Users, CheckCircle2 } from "lucide-react"

interface AttendanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activityId: number
  activityTitle: string
}

export function AttendanceDialog({ open, onOpenChange, activityId, activityTitle }: AttendanceDialogProps) {
  const { toast } = useToast()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])

  useEffect(() => {
    if (open) {
      fetchEnrollments()
    }
  }, [open, activityId])

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/activities/${activityId}`)
      const data = await response.json()
      setEnrollments(data.enrollments || [])
      
      // Pre-select students who are already marked as attended
      const attendedIds = data.enrollments
        ?.filter((e: any) => e.attended)
        .map((e: any) => e.id) || []
      setSelectedStudents(attendedIds)
    } catch (error) {
      console.error("Error fetching enrollments:", error)
      toast({
        title: "Error",
        description: "Failed to load enrollments",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleStudent = (enrollmentId: number) => {
    setSelectedStudents(prev =>
      prev.includes(enrollmentId)
        ? prev.filter(id => id !== enrollmentId)
        : [...prev, enrollmentId]
    )
  }

  const toggleAll = () => {
    if (selectedStudents.length === enrollments.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(enrollments.map(e => e.id))
    }
  }

  const handleSaveAttendance = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentIds: selectedStudents,
          activityId
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Attendance updated for ${selectedStudents.length} student(s)`
        })
        onOpenChange(false)
      } else {
        throw new Error("Failed to update attendance")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Manage Attendance
          </DialogTitle>
          <DialogDescription>
            Mark students as attended for: <strong>{activityTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No students enrolled yet</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedStudents.length === enrollments.length}
                  onCheckedChange={toggleAll}
                />
                <span className="font-medium">Select All</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedStudents.length} of {enrollments.length} selected
              </span>
            </div>

            <div className="space-y-2">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                    selectedStudents.includes(enrollment.id)
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedStudents.includes(enrollment.id)}
                      onCheckedChange={() => toggleStudent(enrollment.id)}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {enrollment.user?.fullName || enrollment.user?.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {enrollment.user?.email}
                      </p>
                    </div>
                  </div>
                  {selectedStudents.includes(enrollment.id) && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSaveAttendance}
                disabled={loading}
                className="flex-1"
              >
                Save Attendance ({selectedStudents.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
