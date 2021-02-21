import React from "react"
import Timer from "../../components/Timer/Timer"
import { useStyles } from "../styles"

export default function AppPage() {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <Timer />
    </div>
  )
}
