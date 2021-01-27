const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles(theme => ({
  SettingsPopup: {
    padding: 20,
    width: "50vw",
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

  TextField: {
    width: "100%",
  },

  TextField__input: {
    padding: 5,
  },

  TextField__label: {
    fontSize: 20,
  },

  submitButton: {
    width: "100%",
    padding: "10px 0",
  },
}));
