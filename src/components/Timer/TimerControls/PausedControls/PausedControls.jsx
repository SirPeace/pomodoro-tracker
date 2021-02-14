import React from "react"
import { connect } from "react-redux"
import { resumeTimer, stopTimer } from "../../../../store/actions/timer"
import TimerButton from "../TimerButton/TimerButton"

function PausedControls({ resumeTimer, stopTimer }) {
  return (
    <>
      <TimerButton type="start" onClick={resumeTimer} locked>
        Resume
      </TimerButton>

      <TimerButton type="stop" onClick={stopTimer}>
        Stop
      </TimerButton>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  resumeTimer: () => dispatch(resumeTimer()),
  stopTimer: () => dispatch(stopTimer()),
})

export default connect(null, mapDispatchToProps)(PausedControls)
