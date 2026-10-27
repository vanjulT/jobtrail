import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatDate"

function JobCard({ job, isSaved, onSave }) {
  return (
    <Card className="rise lift">
      <CardHeader>
        <CardTitle className="text-base text-opal-800">{job.title}</CardTitle>
        <p className="text-sm text-slate-600">{job.company_name}</p>
      </CardHeader>

      <CardContent className="grid gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{job.job_type.replace("_", " ")}</Badge>
          {/* long lists of countries must wrap instead of leaving the card */}
          <Badge
            variant="outline"
            className="h-auto max-w-full whitespace-normal py-0.5 text-left"
          >
            {job.candidate_required_location}
          </Badge>
          {job.salary && <Badge variant="outline">{job.salary}</Badge>}
        </div>

        <p className="text-xs text-slate-500">
          Posted on {formatDate(job.publication_date)}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" disabled={isSaved} onClick={() => onSave(job)}>
            {isSaved ? "Saved" : "Save to my tracker"}
          </Button>
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-opal-700 underline"
          >
            View on Remotive
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard