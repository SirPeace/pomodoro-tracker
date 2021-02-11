import { makeStyles } from "@material-ui/core"
import { timerSize } from "../Timer"

export const useStyles = makeStyles(theme => ({
  progress: {
    position: "relative",
  },

  counter: {
    fontFamily: "Open Sans",
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "5em",
    color: "rgb(85, 85, 85)",
    transform: "translate(-50%, -50%)",
  },

  "@global": {
    svg: {
      width: timerSize,
      height: timerSize,
    },

    circle: {
      stroke: "rgba(192, 192, 192, 0.473)",
      fill: "transparent",
      strokeWidth: 20,
    },
  },

  circle__progress: {
    transformOrigin: "center",
    transform: "rotate(-90deg) rotateX(180deg)",
    stroke: theme.palette.primary.main,
    transition: "stroke 0.5s",
  },

  circle__progress_short_break: {
    stroke: theme.palette.short_break.main,
  },

  circle__progress_long_break: {
    stroke: theme.palette.long_break.main,
  },
}))
