import { Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import DashboardPage from "@/pages/DashboardPage"
import ApplicationsPage from "@/pages/ApplicationsPage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Route>
    </Routes>
  )
}

export default App