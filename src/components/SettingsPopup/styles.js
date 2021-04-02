const { makeStyles } = require("@material-ui/core")

export const useStyles = makeStyles(theme => ({
  SettingsPopup: {
    padding: 20,
    width: "95%",
    maxWidth: 700,
  },

  header: {
    display: "flex",
    justifyContent: "flex-end",
  },

  "label + div": {
    padding: "5px 0",
  },

  closeIcon: {
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      color: "#dc143c",
    },

    "&:active": {
      color: "#92011e",
    },
  },

  body: {
    padding: 20,
  },

  submitButton: {
    width: "100%",
    padding: "12px 0",
  },
}))
