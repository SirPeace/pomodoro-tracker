import React from "react"
import Button from "@material-ui/core/Button"
import { useStyles } from "../styles"
import { connect } from "react-redux"
import { resetTimer, startTimer } from "../../../../store/actions/timer"
import { resetSessionOrder } from "../../../../store/actions/sessions"

function ControlsWithReset({ sessionClass, startTimer, resetTimer }) {
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
        onClick={resetTimer}
      >
        Reset
      </Button>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
  resetTimer: () => {
    dispatch(resetSessionOrder())
    dispatch(resetTimer())
  },
})

export default connect(null, mapDispatchToProps)(ControlsWithReset)
