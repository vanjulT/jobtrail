import { Button } from "@/components/ui/button"
import { useApplications } from "@/context/ApplicationsContext"

function DashboardPage() {
  const { applications, addApplication } = useApplications()

  function addTestApplication() {
    addApplication({
      company: "Test Company",
      role: "Junior Developer",
      dateApplied: new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-opal-800">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        You have {applications.length} applications.
      </p>
      <Button className="mt-4" onClick={addTestApplication}>
        Add test application
      </Button>
    </div>
  )
}

export default DashboardPage