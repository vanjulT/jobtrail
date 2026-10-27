import { useEffect, useState } from "react"

const API_URL = "https://remotive.com/api/remote-jobs"

// Kept outside the hook so the jobs survive while the app stays open.
// This way we do not call the API again each time the page is opened.
let cachedJobs = null

function useRemoteJobs() {
  const [jobs, setJobs] = useState(cachedJobs ?? [])
  const [isLoading, setIsLoading] = useState(cachedJobs === null)
  const [error, setError] = useState("")
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    if (cachedJobs !== null) {
      return
    }

    const controller = new AbortController()

    async function loadJobs() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`The server answered with status ${response.status}.`)
        }
        const data = await response.json()
        cachedJobs = data.jobs
        setJobs(data.jobs)
        setIsLoading(false)
      } catch (err) {
        if (err.name === "AbortError") {
          return
        }
        setError("Could not load the jobs. Check your internet connection and try again.")
        setIsLoading(false)
      }
    }

    loadJobs()

    // if the page is closed before the answer arrives, cancel the request
    return () => controller.abort()
  }, [reloadCount])

  function reload() {
    cachedJobs = null
    setError("")
    setIsLoading(true)
    setReloadCount((count) => count + 1)
  }

  return { jobs, isLoading, error, reload }
}

export default useRemoteJobs