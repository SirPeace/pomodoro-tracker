import { colors, makeStyles } from "@material-ui/core";

const timerSize = 320;

export const useStyles = makeStyles(theme => ({
  Timer: {
    width: timerSize,
    marginTop: 20,
  },

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

  controls: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-around",
  },

  controls__button: {
    width: 80,
    height: 80,
    borderRadius: "100%",
    fontWeight: "bold",
  },

  controls__startButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  controls__startButton_short_break: {
    background: theme.palette.short_break.main,

    "&:hover": {
      backgroundColor: theme.palette.short_break.dark,
    },
  },

  controls__startButton_long_break: {
    background: theme.palette.long_break.main,

    "&:hover": {
      backgroundColor: theme.palette.long_break.dark,
    },
  },

  controls__pauseButton: {
    backgroundColor: colors.grey[500],
    color: "#fff",

    "&:hover": {
      backgroundColor: colors.grey[600],
    },
  },

  controls__stopButton: {
    backgroundColor: colors.red[700],
    color: "#fff",

    "&:hover": {
      backgroundColor: colors.red[900],
    },
  },
}));
