import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  Task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    transition: "background 0.2s",

    "&:hover": {
      background: "rgba(0, 0, 0, 0.05)",
    },
  },

  span: {
    fontSize: 16,
  },

  deleteIcon: {
    fontSize: 20,
    transition: "color 0.2s",
    "&:hover": {
      color: "crimson",
      cursor: "pointer",
    },
  },
}));
