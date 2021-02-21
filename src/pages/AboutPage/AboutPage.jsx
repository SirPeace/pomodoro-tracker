import React from "react"
import { useStyles } from "../styles"

export default function AboutPage() {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <h2 className={classes.h2}>About</h2>
    </div>
  )
}
