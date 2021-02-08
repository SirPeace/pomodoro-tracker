import React from "react"
import RunningControls from "./RunningControls/RunningControls"
import PausedControls from "./PausedControls/PausedControls"
import ControlsWithReset from "./ControlsWithReset/ControlsWithReset"
import { useStyles } from "./styles"
import { Button } from "@material-ui/core"
import { TimerContext } from "../Timer"

export default function TimerControls() {
  const classes = useStyles()
  const { startTimer, timerStatus, sessionID, session } = React.useContext(
    TimerContext
  )

  // Change elements color according to the current session
  let sessionButtonClass = ""
  if (session === "short_break") {
    sessionButtonClass = classes.controls__startButton_short_break
  } else if (session === "long_break") {
    sessionButtonClass = classes.controls__startButton_long_break
  }

  return (
    <div className={classes.controls}>
      {timerStatus === "running" ? (
        <RunningControls />
      ) : timerStatus === "paused" ? (
        <PausedControls />
      ) : sessionID > 0 ? (
        <ControlsWithReset />
      ) : (
        <Button
          variant="contained"
          className={`${classes.button} ${classes.startButton} ${sessionButtonClass}`}
          onClick={startTimer}
        >
          Start
        </Button>
      )}
    </div>
  )
}
