import { colors, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  controls: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {
    width: 200,
    height: 60,
    fontSize: 20,
    letterSpacing: "0.2em",
    transition: "inherit, transform 0.3s",
    marginBottom: 20,
    position: "relative",

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

  // pauseButton_holded: {
  //   "&:before": {
  //     content: '""',
  //     position: "absolute",
  //     top: -3,
  //     bottom: "100%",
  //     left: 0,
  //     right: 0,
  //     backgroundColor: colors.red[700],
  //   },
  // },

  stopButton: {
    backgroundColor: colors.red[700],
    color: "#fff",

    "&:hover": {
      backgroundColor: colors.red[900],
    },
  },
}))
