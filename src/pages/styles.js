import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  page: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 64,
  },

  body: {
    marginTop: 20,
    padding: "20px 40px",
  },

  body__text: {
    fontSize: 18,
  },

  "@global": {
    h2: {
      fontFamily: "Open Sans",
      color: "#444",
      fontSize: 27,
      fontWeight: 700,
      margin: 0,
    },
  },

  "@media (max-width: 600px)": {
    body: {
      padding: "10px 20px",
    },
  },
}))
