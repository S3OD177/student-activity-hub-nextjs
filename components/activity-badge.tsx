import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Users, Clock } from "lucide-react"

interface ActivityBadgeProps {
  activity: any
  enrollmentCount: number
}

export function ActivityBadge({ activity, enrollmentCount }: ActivityBadgeProps) {
  const activityDate = new Date(activity.date)
  const now = new Date()
  const isNew = (now.getTime() - new Date(activity.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
  const isPast = activityDate < now
  const isFull = activity.maxStudents > 0 && enrollmentCount >= activity.maxStudents
  const isAlmostFull = activity.maxStudents > 0 && enrollmentCount >= activity.maxStudents * 0.8
  const isPopular = enrollmentCount > 10

  if (isPast) {
    return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Ended</Badge>
  }
  if (isFull) {
    return <Badge variant="destructive" className="gap-1"><Users className="h-3 w-3" />Full</Badge>
  }
  if (isAlmostFull) {
    return <Badge className="bg-orange-500 gap-1"><Users className="h-3 w-3" />Almost Full</Badge>
  }
  if (isPopular) {
    return <Badge className="bg-purple-500 gap-1"><TrendingUp className="h-3 w-3" />Popular</Badge>
  }
  if (isNew) {
    return <Badge className="bg-green-500 gap-1"><Sparkles className="h-3 w-3" />New</Badge>
  }
  return null
}
