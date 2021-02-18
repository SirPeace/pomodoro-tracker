import { colors, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  body: {
    padding: 40,
  },

  text: {
    maxWidth: 500,
    lineHeight: "1.5em",
    margin: "20px 0",
  },

  message: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
  },

  button: {
    marginRight: 15,
    width: 80,
  },

  acceptButton: {
    color: "#fff",
    backgroundColor: colors.red[600],
    "&:hover": {
      backgroundColor: colors.red[800],
    },
  },

  acceptButton_short_break: {
    background_color: theme.palette.short_break.main,
    "&:hover": {
      background_color: theme.palette.short_break.dark,
    },
  },

  acceptButton_long_break: {
    background_color: theme.palette.long_break.main,
    "&:hover": {
      background_color: theme.palette.long_break.dark,
    },
  },

  dismissButton: {
    backgroundColor: colors.grey[300],
    "&:hover": {
      backgroundColor: colors.grey[400],
    },
  },
}))
