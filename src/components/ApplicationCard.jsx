import { Link } from "react-router-dom"
import StatusBadge from "@/components/StatusBadge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { STATUSES } from "@/lib/constants"
import { formatDate } from "@/lib/formatDate"

function ApplicationCard({ application, onStatusChange, onDelete }) {
  const statusId = `status-${application.id}`

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg text-opal-800">
              {application.company}
            </CardTitle>
            <p className="text-sm text-slate-600">{application.role}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>
      </CardHeader>

      <CardContent className="grid gap-3">
        <p className="text-sm text-slate-600">
          Applied on {formatDate(application.dateApplied)}
        </p>
        {application.interviewDate && (
          <p className="text-sm text-slate-600">
            Interview on {formatDate(application.interviewDate)}
          </p>
        )}

        <div className="grid gap-1">
          <label htmlFor={statusId} className="text-sm font-medium">
            Change status
          </label>
          <select
            id={statusId}
            value={application.status}
            onChange={(event) => onStatusChange(application.id, event.target.value)}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/applications/${application.id}/edit`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Edit
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(application)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ApplicationCard