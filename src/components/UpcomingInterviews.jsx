import { Link } from "react-router-dom"
import { formatDate } from "@/lib/formatDate"

function UpcomingInterviews({ interviews }) {
  if (interviews.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No upcoming interviews. Add an interview date to an application and it
        will show up here.
      </p>
    )
  }

  return (
    <ul className="grid gap-2">
      {interviews.map((app) => (
        <li key={app.id}>
          <Link
            to={`/applications/${app.id}`}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-opal-100 bg-white p-3 hover:bg-opal-50"
          >
            <span>
              <span className="font-medium text-opal-800">{app.company}</span>
              <span className="text-sm text-slate-600"> - {app.role}</span>
            </span>
            <span className="text-sm text-slate-700">
              {formatDate(app.interviewDate)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default UpcomingInterviews