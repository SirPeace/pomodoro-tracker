import React from "react"
import { useStyles } from "../styles"

export default function HowToUsePage() {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <h2 className={classes.h2}>How To Use</h2>
    </div>
  )
}
