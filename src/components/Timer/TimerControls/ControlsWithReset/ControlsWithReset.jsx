import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { TimerContext } from "../../Timer"

export default function ControlsWithReset() {
  const classes = useStyles()

  const { startTimer, resetTimer, sessionClass } = React.useContext(
    TimerContext
  )

  return (
    <>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.startButton} ${sessionClass}`}
        onClick={startTimer}
      >
        Start
      </Button>

      <Button
        variant="contained"
        className={`${classes.button} ${classes.pauseButton} ${sessionClass}`}
        onClick={resetTimer}
      >
        Reset
      </Button>
    </>
  )
}
