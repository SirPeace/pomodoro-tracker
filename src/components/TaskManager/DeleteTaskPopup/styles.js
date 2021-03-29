import { colors, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  body: {
    padding: 40,
    maxWidth: "95%",
  },

  message: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
    marginBottom: 40,
  },

  button: {
    marginRight: 15,
    width: 80,
  },

  "@media (max-width: 600px)": {
    message: {
      textAlign: "center",
    },

    button: {
      padding: "10px 0",
      width: "100%",
      margin: 0,
      marginBottom: 15,
    },
  },

  acceptButton: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  dismissButton: {
    backgroundColor: colors.grey[300],
    "&:hover": {
      backgroundColor: colors.grey[400],
    },
  },
}))
