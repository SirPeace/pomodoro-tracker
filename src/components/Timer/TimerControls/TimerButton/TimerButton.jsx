import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { useStyles } from "./styles"

function TimerButton({
  children,
  onClick,
  session,
  timerStatus,
  type,
  locked,
}) {
  const classes = useStyles()
  const appliedClasses = [classes.button]
  const appliedShadowClasses = [classes.shadow]

  const [btnLock, setBtnLock] = React.useState(false)

  // Set lock on "START" and "PAUSE" buttons after click to prevent state abuse
  React.useEffect(() => {
    if (locked !== undefined) {
      if (timerStatus === "running" || timerStatus === "paused") {
        setBtnLock(true)
        setTimeout(setBtnLock.bind(null, false), 1000)
      }
    }
  }, [timerStatus, locked])

  // Change elements color according to the current session
  if (session === "short_break") {
    appliedClasses.push(classes.startButton_short_break)
  } else if (session === "long_break") {
    appliedClasses.push(classes.startButton_long_break)
  }

  // Set proper class for each button type
  if (type === "start") {
    appliedClasses.push(classes.startButton)
    if (session === "short_break") {
      appliedShadowClasses.push(classes.shadow_short_break)
    } else if (session === "long_break") {
      appliedShadowClasses.push(classes.shadow_long_break)
    }
  } else if (type === "pause") {
    appliedClasses.push(classes.pauseButton)
    appliedShadowClasses.push(classes.shadow_pause)
  } else if (type === "stop") {
    appliedClasses.push(classes.stopButton)
    appliedShadowClasses.push(classes.shadow_stop)
  }

  return (
    <div className={classes.body}>
      <div className={appliedShadowClasses.join(" ")}></div>
      <Button
        disabled={btnLock}
        variant="contained"
        className={appliedClasses.join(" ")}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  timerStatus: state.timer.status,

  session: state.sessions.order[state.sessions.current],
})

export default connect(mapStateToProps)(TimerButton)
