import React from "react"
import { connect } from "react-redux"
import { setDuration, setTime } from "../../store/actions/timer"
import TimerControls from "./TimerControls/TimerControls"
import { makeStyles } from "@material-ui/core"
import TimerClock from "./TimerClock/TimerClock"

const useStyles = makeStyles(theme => ({
  Timer: {
    marginTop: 100,
    width: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none",
  },

  motto: {
    marginTop: 20,
    fontSize: 36,
  },

  "@media (max-height: 830px)": {
    Timer: {
      marginTop: 50,
    },
  },

  "@media (max-height: 650px)": {
    Timer: {
      marginTop: 30,
    },
  },

  "@media (max-width: 400px)": {
    Timer: {
      width: 280,
    },

    motto: {
      marginTop: 20,
      fontSize: 30,
    },
  },
}))

function Timer({
  setTime,
  setDuration,
  status,

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

  let motto = "Focus..."
  if (status !== "running" || session.endsWith("break")) {
    motto = "It's time to work!"
    if (session === "short_break") {
      motto = "Take a short break!"
    } else if (session === "long_break") {
      motto = "Have a proper rest!"
    }
  }

  return (
    <div className={classes.Timer}>
      <h2 className={classes.motto}>{motto}</h2>
      <TimerClock />
      <TimerControls />
    </div>
  )
}

const mapStateToProps = state => ({
  status: state.timer.status,
  session: state.sessions.order[state.sessions.current],

  configuration: state.sessions.configuration,
})

const mapDispatchToProps = dispatch => ({
  setTime: (value, unit) => dispatch(setTime(value, unit)),
  setDuration: (value, unit) => dispatch(setDuration(value, unit)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
