import React from "react"
import { connect } from "react-redux"
import {
  pauseTimer,
  resumeTimer,
  setDuration,
  setTime,
  startTimer,
  stopTimer,
} from "../../store/actions/timer"
import { resetSessionOrder } from "../../store/actions/sessions"
import { useStyles } from "./styles"
import { useStyles as useBtnStyles } from "./TimerControls/styles"
import TimerControls from "./TimerControls/TimerControls"

export const TimerContext = React.createContext()

function Timer({
  // --- timer ---
  time,
  status,
  duration,
  timePassed,

  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
  setTime,
  setDuration,
  // --- timer ---

  // --- sessions ---
  session,
  currentSessionId,
  configuration,

  resetSessionOrder,
  // --- sessions ---
}) {
  const classes = useStyles()
  const btnClasses = useBtnStyles()

  const radius = 150
  const circumference = 2 * Math.PI * radius

  const [offset, setOffset] = React.useState(circumference)

  const [isBtnLocked, setIsBtnLocked] = React.useState(false)

  const playAnimation = () => {
    let start = performance.now()

    requestAnimationFrame(function animate(time) {
      window.animationProgress = (time - start + timePassed) / duration

      if (window.animationProgress >= 0.998) window.animationProgress = 1

      setOffset(circumference + circumference * window.animationProgress)

      if (window.animationProgress < 1) {
        window.animationID = requestAnimationFrame(animate)
      }
    })
  }

  const handleTimerStart = () => {
    if (isBtnLocked) return
    else {
      setIsBtnLocked(true)
      window.setTimeout(setIsBtnLocked.bind(null, false), 1000)
    }

    setOffset(circumference)
    startTimer()
    playAnimation()
  }

  const handleTimerResume = () => {
    if (isBtnLocked) return
    else {
      setIsBtnLocked(true)
      window.setTimeout(setIsBtnLocked.bind(null, false), 1000)
    }

    resumeTimer()
    playAnimation()
  }

  const handleTimerPause = () => {
    if (isBtnLocked) return
    else {
      setIsBtnLocked(true)
      window.setTimeout(setIsBtnLocked.bind(null, false), 1000)
    }

    pauseTimer()
  }

  const handleTimerStop = () => {
    stopTimer()
    setOffset(circumference)
  }

  const handleTimerReset = () => {
    handleTimerStop()
    resetSessionOrder()
  }

  // Change timer's time and duration according to the current session
  React.useEffect(() => {
    let duration = ""

    if (session === "work_session") duration = "workSessionDuration"
    else if (session === "short_break") duration = "shortBreakDuration"
    else duration = "longBreakDuration"

    setTime(configuration[duration], "m")
    setDuration(configuration[duration], "m")
  }, [circumference, session, configuration, setTime, setDuration])

  // Change elements color according to the current session
  let sessionProgressClass = ""
  let sessionButtonClass = ""
  if (session === "short_break") {
    sessionProgressClass = classes.circle__progress_short_break
    sessionButtonClass = btnClasses.startButton_short_break
  } else if (session === "long_break") {
    sessionProgressClass = classes.circle__progress_long_break
    sessionButtonClass = btnClasses.startButton_long_break
  }

  return (
    <div className={classes.Timer}>
      <div className={classes.progress}>
        <span className={classes.counter}>{time}</span>
        <svg>
          <circle cx="50%" cy="50%" r={radius} />
          <circle
            className={`${classes.circle__progress} ${sessionProgressClass}`}
            cx="50%"
            cy="50%"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>
      <TimerContext.Provider
        value={{
          resetTimer: handleTimerReset,
          stopTimer: handleTimerStop,
          pauseTimer: handleTimerPause,
          resumeTimer: handleTimerResume,
          startTimer: handleTimerStart,
          timerStatus: status,
          sessionID: currentSessionId,
          session,
          sessionClass: sessionButtonClass,
          btnLock: isBtnLocked,
        }}
      >
        <TimerControls />
      </TimerContext.Provider>
    </div>
  )
}

const mapStateToProps = state => ({
  // timer
  duration: state.timer.duration,
  time: state.timer.time,
  status: state.timer.status,
  timePassed: state.timer.running.passed,

  // sessions
  session: state.sessions.order[state.sessions.current],
  currentSessionId: state.sessions.current,
  configuration: state.sessions.configuration,
})

const mapDispatchToProps = dispatch => ({
  // timer
  startTimer: () => dispatch(startTimer()),
  resumeTimer: () => dispatch(resumeTimer()),
  pauseTimer: () => dispatch(pauseTimer()),
  stopTimer: () => dispatch(stopTimer()),
  setTime: (value, unit) => dispatch(setTime(value, unit)),
  setDuration: (value, unit) => dispatch(setDuration(value, unit)),

  // sessions
  resetSessionOrder: () => dispatch(resetSessionOrder()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
