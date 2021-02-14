import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { setPopup } from "../../../../store/actions/layout"
import { useStyles } from "../styles"

function ResetButton({
  children,

  setResetTimerPopup,
}) {
  const classes = useStyles()

  return (
    <Button
      className={`${classes.button} ${classes.pauseButton}`}
      onClick={setResetTimerPopup}
      variant="contained"
    >
      {children}
    </Button>
  )
}

const mapDispatchToProps = dispatch => ({
  setResetTimerPopup: () => dispatch(setPopup("reset-timer")),
})

export default connect(null, mapDispatchToProps)(ResetButton)
