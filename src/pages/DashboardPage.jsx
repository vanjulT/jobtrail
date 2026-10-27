import { useMemo } from "react"
import EmptyState from "@/components/EmptyState"
import StatCard from "@/components/StatCard"
import UpcomingInterviews from "@/components/UpcomingInterviews"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplications } from "@/context/ApplicationsContext"
import { STATUSES } from "@/lib/constants"

function DashboardPage() {
  const { applications } = useApplications()

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
        <h1 className="text-2xl font-bold text-opal-800">Dashboard</h1>
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
      <h1 className="text-2xl font-bold text-opal-800">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Total applications" value={total} />
        {STATUSES.map((status) => (
          <StatCard key={status} label={status} value={countsByStatus[status]} />
        ))}
        <StatCard
          label="Response rate"
          value={`${responseRate}%`}
          hint="Applications that moved past Applied"
        />
      </div>

      <Card>
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