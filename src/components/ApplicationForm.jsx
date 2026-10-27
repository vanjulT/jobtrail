import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STATUSES } from "@/lib/constants"

function getEmptyForm() {
  return {
    company: "",
    role: "",
    status: "Applied",
    dateApplied: new Date().toISOString().slice(0, 10),
    interviewDate: "",
    link: "",
  }
}

function ApplicationForm({ initialValues, onSubmit, submitLabel }) {
  const [values, setValues] = useState({ ...getEmptyForm(), ...initialValues })
  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (values.company.trim() === "" || values.role.trim() === "") {
      setError("Please fill in the company and the job title.")
      return
    }
    onSubmit({
      ...values,
      company: values.company.trim(),
      role: values.role.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="company">Company *</Label>
        <Input
          id="company"
          name="company"
          value={values.company}
          onChange={handleChange}
          placeholder="For example: Airbus"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Job title *</Label>
        <Input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          placeholder="For example: Junior Web Developer"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="dateApplied">Date applied</Label>
          <Input
            id="dateApplied"
            name="dateApplied"
            type="date"
            value={values.dateApplied}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="interviewDate">Interview date (optional)</Label>
          <Input
            id="interviewDate"
            name="interviewDate"
            type="date"
            value={values.interviewDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="link">Job link (optional)</Label>
        <Input
          id="link"
          name="link"
          type="url"
          value={values.link}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      {error !== "" && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit">{submitLabel}</Button>
        <Link to="/applications" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default ApplicationForm