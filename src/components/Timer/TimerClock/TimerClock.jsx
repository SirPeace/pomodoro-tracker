import React from "react"
import { connect } from "react-redux"
import { useStyles } from "./styles"

function TimerClock({ session, timePassed, duration, status, time }) {
  const classes = useStyles()

  const radius = 150
  const circumference = 2 * Math.PI * radius

  const [offset, setOffset] = React.useState(circumference)

  // Change elements color according to the current session
  let sessionProgressClass = ""
  if (session === "short_break") {
    sessionProgressClass = classes.circle__progress_short_break
  } else if (session === "long_break") {
    sessionProgressClass = classes.circle__progress_long_break
  }

  React.useEffect(() => {
    if (status === "static") {
      setOffset(circumference)
    }
  }, [status, circumference, timePassed, duration])

  // Progress animation
  React.useLayoutEffect(() => {
    if (status === "running") {
      let start = performance.now()
      let animationID
      let animationProgress

      const animate = time => {
        animationProgress = (time - start + timePassed) / duration

        if (animationProgress >= 0.998) animationProgress = 1

        setOffset(circumference + circumference * animationProgress)

        if (animationProgress < 1) {
          animationID = requestAnimationFrame(animate)
        }
      }

      animationID = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationID)
    }
  }, [status, duration, timePassed, circumference])

  return (
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
  )
}

const mapStateToProps = state => ({
  status: state.timer.status,
  time: state.timer.time,
  timePassed: state.timer.running.passed,
  duration: state.timer.duration,
  session: state.sessions.order[state.sessions.current],
})

export default connect(mapStateToProps)(TimerClock)
