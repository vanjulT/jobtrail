import { Card, CardContent } from "@/components/ui/card"
import useCountUp from "@/hooks/useCountUp"

function StatCard({ label, value, suffix = "", hint, index = 0 }) {
  const shownValue = useCountUp(value)

  return (
    <Card className="rise lift" style={{ "--i": index }}>
      <CardContent>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="mt-1 font-display text-4xl font-semibold text-opal-800">
          {shownValue}
          {suffix}
        </p>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      </CardContent>
    </Card>
  )
}

export default StatCard