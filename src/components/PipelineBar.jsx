import { STATUSES } from "@/lib/constants"

const colours = {
  Applied: "bg-sky-400",
  Interview: "bg-amber-400",
  Offer: "bg-emerald-400",
  Rejected: "bg-rose-400",
}

function PipelineBar({ counts }) {
  const visibleStatuses = STATUSES.filter((status) => counts[status] > 0)
  const description = STATUSES.map((status) => `${status} ${counts[status]}`).join(", ")

  return (
    <div>
      <div
        role="img"
        aria-label={`Pipeline: ${description}`}
        className="flex h-5 gap-1 overflow-hidden rounded-full bg-white/60 p-1"
      >
        {visibleStatuses.map((status, index) => (
          <div
            key={status}
            className={`grow-bar rounded-full ${colours[status]}`}
            style={{ flexGrow: counts[status], "--i": index }}
            title={`${status}: ${counts[status]}`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
        {STATUSES.map((status) => (
          <li key={status} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${colours[status]}`} />
            {status}: {counts[status]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PipelineBar