import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  ApplicationDrawer: {
    padding: "0 40px",
    height: "100%",
  },

  logo: {
    marginTop: "25px 0",
    fontSize: 22,
    letterSpacing: 0,
  },

  logo__link: {
    fontFamily: "Open Sans",
    color: theme.palette.primary.main,
    textDecoration: "none",
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },

  button: {
    display: "block",
    width: "100%",
    fontSize: 16,
    padding: "10px 0",
    color: "#444",
    textAlign: "center",
  },

  install_button: {},

  hr: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}))
