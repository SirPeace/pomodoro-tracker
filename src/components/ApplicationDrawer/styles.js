import { colors, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  ApplicationDrawer: {
    padding: "0 40px",
    height: "100%",
    position: "relative",
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

  installButton: {},

  hr: {
    border: `1px solid ${theme.palette.primary.main}`,
  },

  userInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  },
  userInfo__avatar: {
    borderRadius: "50%",
    width: 48,
    height: 48,
    marginRight: 20,
  },

  userInfo__text: {
    color: theme.palette.primary.contrastText,
    textAlign: "right",
    margin: 0,
  },
  userInfo__name: {
    fontWeight: 500,
    color: theme.palette.primary.contrastText,
    paddingTop: 5,
    display: "inline-block",
  },
}))
