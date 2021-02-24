import React from "react"
import { connect } from "react-redux"
import { useStyles } from "./styles"

function TimerClock({ session, timePassed, duration, status, time }) {
  const classes = useStyles()

  const mediaQuerySm = window.matchMedia("(max-width: 400px)")
  const mediaQueryXsm = window.matchMedia("(max-height: 650px)")
  mediaQuerySm.addListener(evt => {
    if (evt.matches) setRadius(130)
    else setRadius(150)
  })
  mediaQueryXsm.addListener(evt => {
    if (evt.matches) setRadius(110)
    else setRadius(130)
  })

  const radiusInit = mediaQuerySm.matches
    ? mediaQueryXsm.matches
      ? 120
      : 130
    : 150
  const [radius, setRadius] = React.useState(radiusInit)

  const circumference = 2 * Math.PI * radius

  const [offset, setOffset] = React.useState(circumference)

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
    <div className={classes.wrapper}>
      <span className={classes.counter}>{time}</span>
      <svg>
        <circle cx="50%" cy="50%" r={radius} />
        <circle
          className={`${classes.progress}`}
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
