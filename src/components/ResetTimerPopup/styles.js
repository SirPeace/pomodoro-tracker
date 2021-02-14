import { colors, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  body: {
    padding: 40,
  },

  text: {
    maxWidth: 500,
    lineHeight: "1.5em",
    margin: "20px 0",
  },

  message: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
  },

  button: {
    marginRight: 15,
    width: 80,
  },

  acceptButton: {
    color: "#fff",
    backgroundColor: colors.red[600],
    "&:hover": {
      backgroundColor: colors.red[800],
    },
  },

  dismissButton: {
    backgroundColor: colors.grey[300],
    "&:hover": {
      backgroundColor: colors.grey[400],
    },
  },
}));
