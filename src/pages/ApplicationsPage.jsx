import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { useApplications } from "@/context/ApplicationsContext"

function ApplicationsPage() {
  const { applications } = useApplications()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-opal-800">Applications</h1>
        <Link to="/applications/new" className={buttonVariants()}>
          Add application
        </Link>
      </div>

      <ul className="mt-6 grid gap-2">
        {applications.map((app) => (
          <li key={app.id} className="rounded-lg bg-white p-3">
            {app.company} - {app.role} ({app.status})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ApplicationsPage