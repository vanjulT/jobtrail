import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="rounded-xl border border-dashed border-opal-300 bg-white/60 p-10 text-center">
      <h2 className="text-lg font-semibold text-opal-800">{title}</h2>
      <p className="mt-1 text-slate-600">{message}</p>
      {actionTo && (
        <Link to={actionTo} className={`${buttonVariants()} mt-4`}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default EmptyState