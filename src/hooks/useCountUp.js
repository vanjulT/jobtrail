import { useEffect, useState } from "react"

// Counts from 0 up to the target number, like a rolling counter
function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const totalTime = reduceMotion ? 0 : duration
    const startTime = performance.now()
    let frameId

    function step(now) {
      const progress =
        totalTime === 0 ? 1 : Math.min((now - startTime) / totalTime, 1)
      // easing: starts fast, slows down at the end
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)

    // stop the animation if the component disappears
    return () => cancelAnimationFrame(frameId)
  }, [target, duration])

  return value
}

export default useCountUp