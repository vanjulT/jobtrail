import { Card, CardContent } from "@/components/ui/card"

function StatCard({ label, value, hint }) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="mt-1 text-3xl font-bold text-opal-800">{value}</p>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      </CardContent>
    </Card>
  )
}

export default StatCard