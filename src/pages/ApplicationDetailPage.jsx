import { Link, useParams } from "react-router-dom"
import AddNoteForm from "@/components/AddNoteForm"
import EmptyState from "@/components/EmptyState"
import NotesTimeline from "@/components/NotesTimeline"
import StatusBadge from "@/components/StatusBadge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplications } from "@/context/ApplicationsContext"
import { formatDate } from "@/lib/formatDate"

function ApplicationDetailPage() {
  const { id } = useParams()
  const { applications, addNote } = useApplications()
  const application = applications.find((app) => app.id === id)

  if (!application) {
    return (
      <EmptyState
        title="Application not found"
        message="This application does not exist or was deleted."
        actionLabel="Back to applications"
        actionTo="/applications"
      />
    )
  }

  return (
    <div className="grid gap-6">
      <Link to="/applications" className="text-sm text-opal-700 underline">
        Back to applications
      </Link>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle className="text-2xl text-opal-800">
                {application.company}
              </CardTitle>
              <p className="text-slate-600">{application.role}</p>
            </div>
            <StatusBadge status={application.status} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-slate-600">
          <p>Applied on {formatDate(application.dateApplied)}</p>
          {application.interviewDate && (
            <p>Interview on {formatDate(application.interviewDate)}</p>
          )}
          {application.link && (
            <a
              href={application.link}
              target="_blank"
              rel="noreferrer"
              className="text-opal-700 underline"
            >
              Open job posting
            </a>
          )}
          <div className="pt-1">
            <Link
              to={`/applications/${application.id}/edit`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Edit
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-opal-800">Notes timeline</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <AddNoteForm onAddNote={(text) => addNote(application.id, text)} />
          <NotesTimeline notes={application.notes || []} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ApplicationDetailPage