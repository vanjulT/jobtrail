import { Routes, Route } from "react-router-dom"
import EmptyState from "@/components/EmptyState"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardPage from "@/pages/DashboardPage"
import ApplicationsPage from "@/pages/ApplicationsPage"
import ApplicationFormPage from "@/pages/ApplicationFormPage"
import ApplicationDetailPage from "@/pages/ApplicationDetailPage"
import ExploreJobsPage from "@/pages/ExploreJobsPage"
import LoginPage from "@/pages/LoginPage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/new" element={<ApplicationFormPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/applications/:id/edit" element={<ApplicationFormPage />} />
          <Route path="/explore" element={<ExploreJobsPage />} />
        </Route>

        <Route
          path="*"
          element={
            <EmptyState
              title="Page not found"
              message="This page does not exist."
              actionLabel="Go to dashboard"
              actionTo="/"
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App