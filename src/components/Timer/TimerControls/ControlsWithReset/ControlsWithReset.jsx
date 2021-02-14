import React from "react"
import { connect } from "react-redux"
import { startTimer } from "../../../../store/actions/timer"
import { setPopup } from "../../../../store/actions/layout"
import TimerButton from "../TimerButton/TimerButton"

function ControlsWithReset({ startTimer, setResetTimerPopup }) {
  return (
    <>
      <TimerButton type="start" onClick={startTimer}>
        Start
      </TimerButton>

      <TimerButton type="pause" onClick={setResetTimerPopup}>
        Reset
      </TimerButton>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
  setResetTimerPopup: () => dispatch(setPopup("reset-timer")),
})

export default connect(null, mapDispatchToProps)(ControlsWithReset)
