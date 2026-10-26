import { Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import DashboardPage from "@/pages/DashboardPage"
import ApplicationsPage from "@/pages/ApplicationsPage"
import ApplicationFormPage from "@/pages/ApplicationFormPage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/new" element={<ApplicationFormPage />} />
        <Route path="/applications/:id/edit" element={<ApplicationFormPage />} />
      </Route>
    </Routes>
  )
}

export default App