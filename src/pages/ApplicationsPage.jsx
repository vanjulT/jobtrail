import { Link } from "react-router-dom"
import ApplicationCard from "@/components/ApplicationCard"
import EmptyState from "@/components/EmptyState"
import { buttonVariants } from "@/components/ui/button"
import { useApplications } from "@/context/ApplicationsContext"

function ApplicationsPage() {
  const { applications, updateApplication, deleteApplication } = useApplications()

  function handleStatusChange(id, status) {
    updateApplication(id, { status })
  }

  function handleDelete(application) {
    const sure = window.confirm(
      `Delete your application to ${application.company}?`,
    )
    if (sure) {
      deleteApplication(application.id)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-opal-800">Applications</h1>
        <Link to="/applications/new" className={buttonVariants()}>
          Add application
        </Link>
      </div>

      <div className="mt-6">
        {applications.length === 0 ? (
          <EmptyState
            title="No applications yet"
            message="Add your first job application and start tracking it."
            actionLabel="Add application"
            actionTo="/applications/new"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationsPage