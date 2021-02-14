import React from "react"
import { connect } from "react-redux"
import { setPopup } from "../../../../store/actions/layout"
import TimerButton from "../TimerButton/TimerButton"

function ResetButton({
  children,

  setResetTimerPopup,
}) {
  return (
    <TimerButton type="pause" onClick={setResetTimerPopup}>
      {children}
    </TimerButton>
  )
}

const mapDispatchToProps = dispatch => ({
  setResetTimerPopup: () => dispatch(setPopup("reset-timer")),
})

export default connect(null, mapDispatchToProps)(ResetButton)
