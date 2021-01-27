import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  TimerPage: {
    height: "100%",
    width: "100%",
    paddingTop: "4%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  h2: {
    fontFamily: "Open Sans",
    color: "#555555",
    fontSize: 32,
    fontWeight: 600,
  },
}));
