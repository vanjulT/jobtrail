import { Card, CardContent, CardHeader } from "@/components/ui/card"

function JobCardSkeleton() {
  return (
    <Card aria-hidden="true">
      <CardHeader>
        <div className="h-5 w-3/4 animate-pulse rounded bg-opal-100" />
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-opal-100" />
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-opal-100" />
        <div className="h-8 w-32 animate-pulse rounded bg-opal-100" />
      </CardContent>
    </Card>
  )
}

export default JobCardSkeleton