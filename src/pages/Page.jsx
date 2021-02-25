import { ThemeProvider, useTheme } from "@material-ui/core"
import React from "react"
import ApplicationBar from "../components/ApplicationBar/ApplicationBar"
import { useStyles } from "./styles"

export default function Page({ children }) {
  const classes = useStyles()
  const sessionTheme = useTheme()

  return (
    <ThemeProvider theme={sessionTheme}>
      <ApplicationBar />
      <div className={classes.page}>{children}</div>
    </ThemeProvider>
  )
}
