import { Badge } from "@/components/ui/badge"

const colours = {
  Applied: "bg-sky-100 text-sky-800",
  Interview: "bg-amber-100 text-amber-800",
  Offer: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
}

function StatusBadge({ status }) {
  const dotClass = status === "Interview" ? "pulse-dot" : ""

  return (
    <Badge variant="outline" className={`gap-1.5 border-transparent ${colours[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${dotClass}`} />
      {status}
    </Badge>
  )
}

export default StatusBadge