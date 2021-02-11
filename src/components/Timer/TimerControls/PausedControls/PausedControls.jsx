import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { connect } from "react-redux"
import { resumeTimer, stopTimer } from "../../../../store/actions/timer"

function PausedControls({ sessionClass, btnLock, resumeTimer, stopTimer }) {
  const classes = useStyles()

  return (
    <>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.startButton} ${sessionClass}`}
        onClick={resumeTimer}
        disabled={btnLock}
      >
        Resume
      </Button>

      <Button
        variant="contained"
        className={`${classes.button} ${classes.stopButton}`}
        onClick={stopTimer}
      >
        Stop
      </Button>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  resumeTimer: () => dispatch(resumeTimer()),
  stopTimer: () => dispatch(stopTimer()),
})

export default connect(null, mapDispatchToProps)(PausedControls)
