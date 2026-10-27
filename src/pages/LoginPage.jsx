import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

function LoginPage() {
  const { isLoggedIn, login } = useAuth()
  const location = useLocation()
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const destination = location.state?.from?.pathname || "/"

  // already logged in, or just logged in: go to the page the person wanted
  if (isLoggedIn) {
    return <Navigate to={destination} replace />
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (name.trim() === "") {
      setError("Please type your name.")
      return
    }
    login(name.trim())
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl text-opal-800">Welcome to JobTrail</CardTitle>
        <p className="text-sm text-slate-600">
          This is a demo login: no password, just your name.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="For example: Vanjul"
            />
          </div>

          {error !== "" && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit">Log in</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginPage