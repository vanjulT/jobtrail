import { NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/applications", label: "Applications" },
]

function Navbar() {
  return (
    <header className="border-b border-opal-200 bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <span className="text-lg font-bold text-opal-700">JobTrail</span>
        <ul className="flex gap-4">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-opal-700 underline underline-offset-4"
                    : "text-slate-600 hover:text-opal-700"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar