import { Outlet, useLocation } from "react-router-dom"
import Navbar from "@/components/Navbar"

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* the key changes with the address, so the fade starts again on each page */}
      <main key={location.pathname} className="page-fade mx-auto max-w-5xl px-4 pb-16 pt-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout