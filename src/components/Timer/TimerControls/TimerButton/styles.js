import { colors, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  body: {
    position: "relative",
    marginBottom: 20,
    width: "80%",
    minWidth: 200,
    height: 60,
  },

  shadow: {
    position: "absolute",
    top: 3,
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: -3,
    background: theme.palette.primary.dark,
    borderRadius: 4,
  },

  shadow_short_break: {
    background: theme.palette.short_break.dark,
  },

  shadow_long_break: {
    background: theme.palette.long_break.dark,
  },

  shadow_pause: {
    background: colors.grey[600],
  },

  shadow_stop: {
    background: colors.red[900],
  },

  button: {
    width: "100%",
    height: "100%",
    fontSize: 20,
    letterSpacing: "0.2em",
    transition: "inherit, transform 0.3s",
    position: "relative",
    zIndex: 2,

    "&:active": {
      transform: "translateY(3px)",
    },
  },

  startButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  startButton_short_break: {
    background: theme.palette.short_break.main,

    "&:hover": {
      backgroundColor: theme.palette.short_break.dark,
    },
  },

  startButton_long_break: {
    background: theme.palette.long_break.main,

    "&:hover": {
      backgroundColor: theme.palette.long_break.dark,
    },
  },

  pauseButton: {
    backgroundColor: colors.grey[500],
    color: "#fff",

    "&:hover": {
      backgroundColor: colors.grey[600],
    },
  },

  stopButton: {
    backgroundColor: colors.red[700],
    color: "#fff",

    "&:hover": {
      backgroundColor: colors.red[900],
    },
  },
}))
