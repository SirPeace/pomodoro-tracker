import React from "react"
import RunningControls from "./RunningControls/RunningControls"
import PausedControls from "./PausedControls/PausedControls"
import ControlsWithReset from "./ControlsWithReset/ControlsWithReset"
import { useStyles } from "./styles"
import { Button } from "@material-ui/core"
import { connect } from "react-redux"
import { startTimer } from "../../../store/actions/timer"

function TimerControls({ startTimer, timerStatus, sessionID, session }) {
  const classes = useStyles()

  const [btnLock, setBtnLock] = React.useState(false)

  // Change elements color according to the current session
  let sessionButtonClass = ""
  if (session === "short_break") {
    sessionButtonClass = classes.startButton_short_break
  } else if (session === "long_break") {
    sessionButtonClass = classes.startButton_long_break
  }

  // Set lock on "START" and "PAUSE" buttons after click to prevent state abuse
  React.useEffect(() => {
    if (timerStatus === "running" || timerStatus === "paused") {
      setBtnLock(true)
      setTimeout(setBtnLock.bind(null, false), 1000)
    }
  }, [timerStatus])

  return (
    <div className={classes.controls}>
      {timerStatus === "running" ? (
        <RunningControls btnLock={btnLock} />
      ) : timerStatus === "paused" ? (
        <PausedControls sessionClass={sessionButtonClass} btnLock={btnLock} />
      ) : sessionID > 0 ? (
        <ControlsWithReset sessionClass={sessionButtonClass} />
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

const mapStateToProps = state => ({
  timerStatus: state.timer.status,
  sessionID: state.sessions.current,
  session: state.sessions.order[state.sessions.current],
})

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerControls)
