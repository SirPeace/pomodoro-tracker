import { makeStyles } from "@material-ui/core"
import { timerSize } from "../Timer"

export const useStyles = makeStyles(theme => ({
  wrapper: {
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

  progress: {
    transformOrigin: "center",
    transform: "rotate(-90deg) rotateX(180deg)",
    stroke: theme.palette.primary.main,
    transition: "stroke 0.5s",
  },
}))
