import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import ApplicationCard from "@/components/ApplicationCard"
import EmptyState from "@/components/EmptyState"
import FilterBar from "@/components/FilterBar"
import { buttonVariants } from "@/components/ui/button"
import { useApplications } from "@/context/ApplicationsContext"

function ApplicationsPage() {
  const { applications, updateApplication, deleteApplication } = useApplications()

  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortOrder, setSortOrder] = useState("newest")

  // Only recalculated when the list or one of the filters changes
  const visibleApplications = useMemo(() => {
    const search = searchText.trim().toLowerCase()

    return applications
      .filter((app) => statusFilter === "All" || app.status === statusFilter)
      .filter((app) => app.company.toLowerCase().includes(search))
      .sort((a, b) => {
        const dateA = a.dateApplied || ""
        const dateB = b.dateApplied || ""
        return sortOrder === "newest"
          ? dateB.localeCompare(dateA)
          : dateA.localeCompare(dateB)
      })
  }, [applications, searchText, statusFilter, sortOrder])

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
        <h1 className="text-2xl text-opal-800">Applications</h1>
        <Link to="/applications/new" className={buttonVariants()}>
          Add application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No applications yet"
            message="Add your first job application and start tracking it."
            actionLabel="Add application"
            actionTo="/applications/new"
          />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <FilterBar
              searchText={searchText}
              onSearchTextChange={setSearchText}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
          </div>

          <p className="mt-4 text-sm text-slate-600">
            Showing {visibleApplications.length} of {applications.length} applications
          </p>

          <div className="mt-4">
            {visibleApplications.length === 0 ? (
              <EmptyState
                title="No matching applications"
                message="Try a different search or another status."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleApplications.map((application, index) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    index={index}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ApplicationsPage