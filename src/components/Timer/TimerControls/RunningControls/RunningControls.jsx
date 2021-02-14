import React from "react"
import { pauseTimer, stopTimer } from "../../../../store/actions/timer"
import { connect } from "react-redux"
import TimerButton from "../TimerButton/TimerButton"

function RunningControls({ pauseTimer, stopTimer }) {
  return (
    <>
      <TimerButton type="pause" onClick={pauseTimer} locked>
        Pause
      </TimerButton>

      <TimerButton type="stop" onClick={stopTimer}>
        Stop
      </TimerButton>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  stopTimer: () => dispatch(stopTimer()),
  pauseTimer: () => dispatch(pauseTimer()),
})

export default connect(null, mapDispatchToProps)(RunningControls)
