import { createContext, useContext } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"

const ApplicationsContext = createContext(null)

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useLocalStorage("jobtrail-applications", [])

  function addApplication(data) {
    const newApplication = {
      id: crypto.randomUUID(),
      status: "Applied",
      notes: [],
      ...data,
    }
    setApplications((current) => [newApplication, ...current])
    return newApplication.id
  }

  function updateApplication(id, changes) {
    setApplications((current) =>
      current.map((app) => (app.id === id ? { ...app, ...changes } : app)),
    )
  }

  function deleteApplication(id) {
    setApplications((current) => current.filter((app) => app.id !== id))
  }

  function addNote(id, text) {
    const note = { id: crypto.randomUUID(), text, date: new Date().toISOString() }
    setApplications((current) =>
      current.map((app) =>
        app.id === id ? { ...app, notes: [note, ...app.notes] } : app,
      ),
    )
  }

  const value = {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    addNote,
  }

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApplications() {
  const context = useContext(ApplicationsContext)
  if (context === null) {
    throw new Error("useApplications must be used inside ApplicationsProvider")
  }
  return context
}