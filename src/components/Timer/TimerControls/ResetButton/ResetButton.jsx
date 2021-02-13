import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { setPopup } from "../../../../store/actions/layout"
import { useStyles } from "../styles"

export const btnHoldDuration = 3000 // in ms

function ResetButton({
  resetTechnic,
  resetTimer,
  children,

  setResetTimerPopup,
}) {
  const [isHold, setIsHold] = React.useState(false)
  let resetTimeout = undefined

  const classes = useStyles()
  const appliedClasses = [classes.button, classes.pauseButton]

  if (isHold) {
    console.log("push", appliedClasses)
    appliedClasses.push(classes.pauseButton_holded)
  } else {
    console.log("release", appliedClasses)
    appliedClasses.filter(className => className !== classes.pauseButton_holded)
  }

  const handlePress = event => {
    // On left mouse button
    if (event.button === 0 || event.button === 1) {
      setIsHold(true)

      if (resetTechnic === "hold") {
        resetTimeout = setTimeout(resetTimer, btnHoldDuration)
      } else if (resetTechnic === "popup") {
        setResetTimerPopup()
      } else {
        throw new Error("Unknown reset technic: " + resetTechnic)
      }
    }
  }

  const handleRelease = () => {
    setIsHold(false)
    clearTimeout(resetTimeout)
  }

  return (
    <Button
      className={appliedClasses.join(" ")}
      onMouseDown={e => handlePress(e)}
      onMouseUp={handleRelease}
      variant="contained"
    >
      {children}
    </Button>
  )
}

const mapStateToProps = state => ({
  resetTechnic: state.sessions.resetTechnic,
})

const mapDispatchToProps = dispatch => ({
  setResetTimerPopup: () => dispatch(setPopup("reset-timer")),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton)
