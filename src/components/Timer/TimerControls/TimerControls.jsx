import React from "react"
import RunningControls from "./RunningControls/RunningControls"
import PausedControls from "./PausedControls/PausedControls"
import ControlsWithReset from "./ControlsWithReset/ControlsWithReset"
import { connect } from "react-redux"
import { startTimer } from "../../../store/actions/timer"
import TimerButton from "./TimerButton/TimerButton"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  controls: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
}))

function TimerControls({ startTimer, timerStatus, sessionID }) {
  const classes = useStyles()

  return (
    <div className={classes.controls}>
      {timerStatus === "running" ? (
        <RunningControls />
      ) : timerStatus === "paused" ? (
        <PausedControls />
      ) : sessionID > 0 ? (
        <ControlsWithReset />
      ) : (
        <TimerButton onClick={startTimer} type="start">
          Start
        </TimerButton>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  timerStatus: state.timer.status,
  sessionID: state.sessions.current,
})

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerControls)
