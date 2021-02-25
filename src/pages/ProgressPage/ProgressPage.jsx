import React from "react"
import Page from "../Page"
import { useStyles } from "../styles"

export default function ProgressPage() {
  const classes = useStyles()

  return (
    <Page>
      <h2 className={classes.h2}>Progress</h2>
    </Page>
  )
}
