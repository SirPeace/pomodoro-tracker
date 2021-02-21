import React from "react"
import { useStyles } from "../styles"

export default function ProgressPage() {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <h2 className={classes.h2}>Progress</h2>
    </div>
  )
}
