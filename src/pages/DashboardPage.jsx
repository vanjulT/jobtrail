import { useMemo } from "react"
import EmptyState from "@/components/EmptyState"
import PipelineBar from "@/components/PipelineBar"
import StatCard from "@/components/StatCard"
import UpcomingInterviews from "@/components/UpcomingInterviews"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplications } from "@/context/ApplicationsContext"
import { useAuth } from "@/context/AuthContext"
import { STATUSES } from "@/lib/constants"

function DashboardPage() {
  const { applications } = useApplications()
  const { userName } = useAuth()

  const countsByStatus = useMemo(() => {
    const counts = {}
    STATUSES.forEach((status) => {
      counts[status] = 0
    })
    applications.forEach((app) => {
      counts[app.status] += 1
    })
    return counts
  }, [applications])

  const upcomingInterviews = useMemo(() => {
    // "en-CA" gives a date like 2026-10-27, in the local time zone
    const today = new Date().toLocaleDateString("en-CA")
    return applications
      .filter((app) => app.interviewDate && app.interviewDate >= today)
      .sort((a, b) => a.interviewDate.localeCompare(b.interviewDate))
  }, [applications])

  const total = applications.length
  const responded = total - countsByStatus.Applied
  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100)

  if (total === 0) {
    return (
      <div>
        <h1 className="text-2xl text-opal-800">Dashboard</h1>
        <div className="mt-6">
          <EmptyState
            title="Nothing to show yet"
            message="Add your first application and your statistics will appear here."
            actionLabel="Add application"
            actionTo="/applications/new"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl text-opal-800">Dashboard</h1>
        <p className="mt-1 text-slate-600">
          Welcome back, {userName}. Here is where your job search stands.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Total applications" value={total} index={0} />
        {STATUSES.map((status, position) => (
          <StatCard
            key={status}
            label={status}
            value={countsByStatus[status]}
            index={position + 1}
          />
        ))}
        <StatCard
          label="Response rate"
          value={responseRate}
          suffix="%"
          hint="Applications that moved past Applied"
          index={5}
        />
      </div>

      <Card className="rise" style={{ "--i": 6 }}>
        <CardHeader>
          <CardTitle className="text-lg text-opal-800">Your pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <PipelineBar counts={countsByStatus} />
        </CardContent>
      </Card>

      <Card className="rise" style={{ "--i": 7 }}>
        <CardHeader>
          <CardTitle className="text-lg text-opal-800">Upcoming interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <UpcomingInterviews interviews={upcomingInterviews} />
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage