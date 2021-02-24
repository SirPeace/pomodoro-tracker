import React from "react"
import { Paper, Button } from "@material-ui/core"
import { connect } from "react-redux"
import { setPopup } from "../../store/actions/layout"
import { resetSessionOrder } from "../../store/actions/sessions"
import { resetTimer } from "../../store/actions/timer"
import { useStyles } from "./styles"

function ResetTimerPopup({ closePopup, resetProgress }) {
  const classes = useStyles()

  const handleAccept = () => {
    resetProgress()
    closePopup()
  }

  return (
    <Paper elevation={1} className={classes.body} id="reset-timer-popup">
      <h3 className={classes.message}>Do you want to reset the session?</h3>

      <p className={classes.text}>
        This will lead to loosing your current session streak. This won't,
        however, affect your progress, which is already saved.
      </p>

      <Button
        onClick={handleAccept}
        variant="contained"
        className={`${classes.acceptButton} ${classes.button}`}
      >
        Yes
      </Button>

      <Button
        onClick={closePopup}
        variant="contained"
        className={`${classes.dismissButton} ${classes.button}`}
      >
        No
      </Button>
    </Paper>
  )
}

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(setPopup(false)),
  resetProgress: () => {
    dispatch(resetTimer())
    dispatch(resetSessionOrder())
  },
})

export default connect(null, mapDispatchToProps)(ResetTimerPopup)
