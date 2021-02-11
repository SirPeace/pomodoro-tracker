import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { pauseTimer, stopTimer } from "../../../../store/actions/timer"
import { connect } from "react-redux"

function RunningControls({ btnLock, pauseTimer, stopTimer }) {
  const classes = useStyles()

  return (
    <>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.pauseButton}`}
        onClick={pauseTimer}
        disabled={btnLock}
      >
        Pause
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
  stopTimer: () => dispatch(stopTimer()),
  pauseTimer: () => dispatch(pauseTimer()),
})

export default connect(null, mapDispatchToProps)(RunningControls)
