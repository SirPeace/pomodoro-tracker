import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  ApplicationBar: {
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.4)",
    transition: "background-color 0.5s",
    backgroundColor: theme.palette.primary,
  },

  barButton: {
    margin: "0 1px",
  },

  appDrawerButton: {
    marginRight: 10,
  },

  title: {
    display: "flex",
    justifyContent: "flex-start",
    flexGrow: 1,
    alignItems: "center",
    height: "100%",
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
    height: "50%",
    width: 2,
    backgroundColor: "#fff",
    margin: "0 12px",
  },
}))
