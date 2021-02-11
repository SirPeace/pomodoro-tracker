import React from "react"
import { connect } from "react-redux"
import { setDuration, setTime } from "../../store/actions/timer"
import TimerControls from "./TimerControls/TimerControls"
import { makeStyles } from "@material-ui/core"
import TimerClock from "./TimerClock/TimerClock"

export const timerSize = 320
const useStyles = makeStyles(theme => ({
  Timer: {
    width: timerSize,
    marginTop: 20,
  },
}))

function Timer({
  setTime,
  setDuration,

  session,
  configuration,
}) {
  const classes = useStyles()

  // Change timer's time and duration according to the current session
  React.useEffect(() => {
    let duration = ""

    if (session === "work_session") duration = "workSessionDuration"
    else if (session === "short_break") duration = "shortBreakDuration"
    else duration = "longBreakDuration"

    setTime(configuration[duration], "m")
    setDuration(configuration[duration], "m")
  }, [session, configuration, setTime, setDuration])

  return (
    <div className={classes.Timer}>
      <TimerClock />
      <TimerControls />
    </div>
  )
}

const mapStateToProps = state => ({
  session: state.sessions.order[state.sessions.current],

  configuration: state.sessions.configuration,
})

const mapDispatchToProps = dispatch => ({
  setTime: (value, unit) => dispatch(setTime(value, unit)),
  setDuration: (value, unit) => dispatch(setDuration(value, unit)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
