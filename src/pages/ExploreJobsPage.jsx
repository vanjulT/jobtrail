import { useMemo, useState } from "react"
import EmptyState from "@/components/EmptyState"
import JobCard from "@/components/JobCard"
import JobCardSkeleton from "@/components/JobCardSkeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApplications } from "@/context/ApplicationsContext"
import useRemoteJobs from "@/hooks/useRemoteJobs"

function ExploreJobsPage() {
  const { jobs, isLoading, error, reload } = useRemoteJobs()
  const { applications, addApplication } = useApplications()
  const [searchText, setSearchText] = useState("")
  const [jobType, setJobType] = useState("All")

  const jobTypes = useMemo(
    () => [...new Set(jobs.map((job) => job.job_type))],
    [jobs],
  )

  const visibleJobs = useMemo(() => {
    const search = searchText.trim().toLowerCase()
    return jobs
      .filter((job) => jobType === "All" || job.job_type === jobType)
      .filter(
        (job) =>
          job.title.toLowerCase().includes(search) ||
          job.company_name.toLowerCase().includes(search),
      )
  }, [jobs, searchText, jobType])

  const savedJobIds = useMemo(
    () => new Set(applications.filter((app) => app.jobId).map((app) => app.jobId)),
    [applications],
  )

  function handleSave(job) {
    addApplication({
      company: job.company_name,
      role: job.title,
      dateApplied: new Date().toLocaleDateString("en-CA"),
      link: job.url,
      jobId: job.id,
    })
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold text-opal-800">Explore jobs</h1>
        <p className="mt-1 text-sm text-slate-600">
          Remote jobs provided by{" "}
          <a
            href="https://remotive.com"
            target="_blank"
            rel="noreferrer"
            className="text-opal-700 underline"
          >
            Remotive
          </a>
          . Save the ones you like to your tracker.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="jobSearch">Search title or company</Label>
          <Input
            id="jobSearch"
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="For example: react"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="jobType">Job type</Label>
          <select
            id="jobType"
            value={jobType}
            onChange={(event) => setJobType(event.target.value)}
            className="h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="All">All types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && error !== "" && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
        >
          <p className="text-red-800">{error}</p>
          <Button className="mt-4" onClick={reload}>
            Try again
          </Button>
        </div>
      )}

      {!isLoading && error === "" && visibleJobs.length === 0 && (
        <EmptyState
          title="No jobs found"
          message="Try a different search or another job type."
        />
      )}

      {!isLoading && error === "" && visibleJobs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.has(job.id)}
              onSave={handleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExploreJobsPage