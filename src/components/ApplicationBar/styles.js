import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  ApplicationBar: {
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.4)",
    transition: "background-color 0.5s",
    backgroundColor: theme.palette.primary,
  },

  // ApplicationBar_short_break: {
  //   backgroundColor: theme.palette.short_break.main,
  // },

  // ApplicationBar_long_break: {
  //   backgroundColor: theme.palette.long_break.main,
  // },

  menuButton: {
    marginRight: 20,
  },

  title: {
    display: "flex",
    justifyContent: "flex-start",
    flexGrow: 1,
    alignItems: "center",
  },

  appTitle: {
    fontSize: 21,
    fontWeight: 500,
  },

  sessionProgress: {
    fontSize: 19,
  },

  separator: {
    fontSize: 32,
    fontWeight: 300,
  },
}))
