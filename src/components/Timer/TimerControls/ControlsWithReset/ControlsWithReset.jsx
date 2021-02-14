import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { connect } from "react-redux"
import { startTimer } from "../../../../store/actions/timer"
import { setPopup } from "../../../../store/actions/layout"

function ControlsWithReset({ sessionClass, startTimer, setResetTimerPopup }) {
  const classes = useStyles()

  return (
    <>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.startButton} ${sessionClass}`}
        onClick={startTimer}
      >
        Start
      </Button>

      <Button
        variant="contained"
        className={`${classes.button} ${classes.pauseButton} ${sessionClass}`}
        onClick={setResetTimerPopup}
      >
        Reset
      </Button>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
  setResetTimerPopup: () => dispatch(setPopup("reset-timer")),
})

export default connect(null, mapDispatchToProps)(ControlsWithReset)
