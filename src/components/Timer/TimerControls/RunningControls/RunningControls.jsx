import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { TimerContext } from "../../Timer"

export default function RunningControls() {
  const classes = useStyles()
  const { btnLock, pauseTimer, stopTimer } = React.useContext(TimerContext)

  return (
    <>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.pauseButton}`}
        onClick={pauseTimer}
        disabled={btnLock}
      >
        Pause
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
