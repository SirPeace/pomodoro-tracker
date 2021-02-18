import React from "react"
import { defaultTheme, shortBreakTheme, longBreakTheme } from "../../AppThemes"

export default function useSessionTheme(session) {
  const [theme, setTheme] = React.useState(defaultTheme)
  console.log(session)

  React.useEffect(() => {
    if (session === "long_break") {
      setTheme(longBreakTheme)
    } else if (session === "short_break") {
      console.log("short_break_theme", shortBreakTheme.palette.primary.main)
      setTheme(shortBreakTheme)
    } else {
      console.log("default_theme", defaultTheme.palette.primary.main)
      setTheme(defaultTheme)
    }
  }, [session])

  return theme
}
