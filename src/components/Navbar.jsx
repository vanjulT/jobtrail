import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/applications", label: "Applications" },
  { to: "/explore", label: "Explore Jobs" },
]

function Navbar() {
  const { userName, isLoggedIn, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 px-4 pt-3">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/60 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(40,80,75,0.3)] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-teal-300 via-sky-300 to-fuchsia-300 shadow-[0_0_12px_rgba(120,200,255,0.9)]" />
          <span className="opal-sheen font-display text-lg font-semibold">
            JobTrail
          </span>
        </div>

        {isLoggedIn && (
          <div className="flex flex-wrap items-center gap-3">
            <ul className="flex flex-wrap gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-full bg-opal-100 px-3 py-1 text-sm font-medium text-opal-800"
                        : "rounded-full px-3 py-1 text-sm text-slate-600 transition-colors hover:bg-white/80 hover:text-opal-800"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <span className="text-sm text-slate-600">Hi, {userName}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              Log out
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar