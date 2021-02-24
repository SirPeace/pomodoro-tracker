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

  "@global": {
    h2: {
      fontFamily: "Open Sans",
      color: "#444",
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: 1.5,
      margin: 0,
    },

    blockquote: {
      fontStyle: "italic",
    },
  },

  "@media (max-width: 400px)": {
    "@global": {
      h2: {
        fontSize: 27,
      },
    },
  },
}))
