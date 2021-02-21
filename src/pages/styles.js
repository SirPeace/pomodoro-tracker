import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  page: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },

  "@global": {
    h2: {
      fontFamily: "Open Sans",
      color: "#444",
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: 1.5,
      margin: 0,
    },
  },
}))
