import { Badge } from "@/components/ui/badge"

const colours = {
  Applied: "bg-sky-100 text-sky-800",
  Interview: "bg-amber-100 text-amber-800",
  Offer: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
}

function StatusBadge({ status }) {
  return (
    <Badge variant="outline" className={`border-transparent ${colours[status]}`}>
      {status}
    </Badge>
  )
}

export default StatusBadge