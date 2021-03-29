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

  body: {
    marginTop: 20,
    padding: "20px 40px",
  },

  body__text: {
    fontSize: 18,
  },

  h2: {
    fontFamily: "Open Sans",
    color: "#444",
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: 1.5,
    margin: 0,
  },

  "@media (max-width: 400px)": {
    "@global": {
      h2: {
        fontSize: 27,
      },
    },
  },
}))
