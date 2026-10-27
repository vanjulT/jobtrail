import { Link, useNavigate, useParams } from "react-router-dom"
import ApplicationForm from "@/components/ApplicationForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplications } from "@/context/ApplicationsContext"

function ApplicationFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, addApplication, updateApplication } = useApplications()

  const isEditing = id !== undefined
  const existing = applications.find((app) => app.id === id)

  if (isEditing && !existing) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-opal-800">Application not found</h1>
        <Link to="/applications" className="mt-2 inline-block text-opal-700 underline">
          Back to applications
        </Link>
      </div>
    )
  }

  function handleSubmit(values) {
    if (isEditing) {
      updateApplication(id, values)
    } else {
      addApplication(values)
    }
    navigate("/applications")
  }

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-xl text-opal-800">
          {isEditing ? "Edit application" : "Add application"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ApplicationForm
          initialValues={existing}
          onSubmit={handleSubmit}
          submitLabel={isEditing ? "Save changes" : "Add application"}
        />
      </CardContent>
    </Card>
  )
}

export default ApplicationFormPage