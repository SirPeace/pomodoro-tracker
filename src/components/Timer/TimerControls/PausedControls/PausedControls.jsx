import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { TimerContext } from "../../Timer"

export default function PausedControls() {
  const classes = useStyles()
  const { resumeTimer, stopTimer, btnLock, sessionClass } = React.useContext(
    TimerContext
  )

  return (
    <>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.startButton} ${sessionClass}`}
        onClick={resumeTimer}
        disabled={btnLock}
      >
        Resume
      </Button>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.stopButton}`}
        onClick={stopTimer}
      >
        Stop
      </Button>
    </>
  )
}
